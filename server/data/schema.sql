-- This file was automatically generated from the `TUTORIAL.md` which
-- contains a complete explanation of how this schema works and why certain
-- decisions were made. If you are looking for a comprehensive tutorial,
-- definetly check it out as this file is a little tough to read.
--
-- If you want to contribute to this file, please change the
-- `TUTORIAL.md` file and then rebuild this file :)

begin;

create schema fuser;
create schema fuser_private;

create table fuser.person (
  id               serial primary key,
  first_name       text not null check (char_length(first_name) < 80),
  last_name        text check (char_length(last_name) < 80),
  about            text,
  created_at       timestamp default now()
);

comment on table fuser.person is 'A user of the forum.';
comment on column fuser.person.id is 'The primary unique identifier for the person.';
comment on column fuser.person.first_name is 'The person’s first name.';
comment on column fuser.person.last_name is 'The person’s last name.';
comment on column fuser.person.about is 'A short description about the user, written by the user.';
comment on column fuser.person.created_at is 'The time this person was created.';

create type fuser.post_topic as enum (
  'discussion',
  'inspiration',
  'help',
  'showcase'
);

create table fuser.post (
  id               serial primary key,
  author_id        integer not null references fuser.person(id),
  headline         text not null check (char_length(headline) < 280),
  body             text,
  topic            fuser.post_topic,
  created_at       timestamp default now()
);

comment on table fuser.post is 'A forum post written by a user.';
comment on column fuser.post.id is 'The primary key for the post.';
comment on column fuser.post.headline is 'The title written by the user.';
comment on column fuser.post.author_id is 'The id of the author user.';
comment on column fuser.post.topic is 'The topic this has been posted in.';
comment on column fuser.post.body is 'The main body text of our post.';
comment on column fuser.post.created_at is 'The time this post was created.';

create function fuser.person_full_name(person fuser.person) returns text as $$
  select person.first_name || ' ' || person.last_name
$$ language sql stable;

comment on function fuser.person_full_name(fuser.person) is 'A person’s full name which is a concatenation of their first and last name.';

create function fuser.post_summary(
  post fuser.post,
  length int default 50,
  omission text default '…'
) returns text as $$
  select case
    when post.body is null then null
    else substr(post.body, 0, length) || omission
  end
$$ language sql stable;

comment on function fuser.post_summary(fuser.post, int, text) is 'A truncated version of the body for summaries.';

create function fuser.person_latest_post(person fuser.person) returns fuser.post as $$
  select post.*
  from fuser.post as post
  where post.author_id = person.id
  order by created_at desc
  limit 1
$$ language sql stable;

comment on function fuser.person_latest_post(fuser.person) is 'Get’s the latest post written by the person.';

create function fuser.search_posts(search text) returns setof fuser.post as $$
  select post.*
  from fuser.post as post
  where post.headline ilike ('%' || search || '%') or post.body ilike ('%' || search || '%')
$$ language sql stable;

comment on function fuser.search_posts(text) is 'Returns posts containing a given search term.';

alter table fuser.person add column updated_at timestamp default now();
alter table fuser.post add column updated_at timestamp default now();

create function fuser_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger person_updated_at before update
  on fuser.person
  for each row
  execute procedure fuser_private.set_updated_at();

create trigger post_updated_at before update
  on fuser.post
  for each row
  execute procedure fuser_private.set_updated_at();

create table fuser_private.person_account (
  person_id        integer primary key references fuser.person(id) on delete cascade,
  email            text not null unique check (email ~* '^.+@.+\..+$'),
  password_hash    text not null
);

comment on table fuser_private.person_account is 'Private information about a person’s account.';
comment on column fuser_private.person_account.person_id is 'The id of the person associated with this account.';
comment on column fuser_private.person_account.email is 'The email address of the person.';
comment on column fuser_private.person_account.password_hash is 'An opaque hash of the person’s password.';

create extension if not exists "pgcrypto";

create function fuser.register_person(
  first_name text,
  last_name text,
  email text,
  password text
) returns fuser.person as $$
declare
  person fuser.person;
begin
  insert into fuser.person (first_name, last_name) values
    (first_name, last_name)
    returning * into person;

  insert into fuser_private.person_account (person_id, email, password_hash) values
    (person.id, email, crypt(password, gen_salt('bf')));

  return person;
end;
$$ language plpgsql strict security definer;

comment on function fuser.register_person(text, text, text, text) is 'Registers a single user and creates an account in our forum.';

create role fuser_postgraphql login password 'WzTvpViyx7hOR9LTrO4zF2OEs2Lzc8ynX1gawnzr90ZS';

create role fuser_anonymous;
grant fuser_anonymous to fuser_postgraphql;

create role fuser_person;
grant fuser_person to fuser_postgraphql;

create type fuser.jwt_token as (
  role text,
  person_id integer
);

create function fuser.authenticate(
  email text,
  password text
) returns fuser.jwt_token as $$
declare
  account fuser_private.person_account;
begin
  select a.* into account
  from fuser_private.person_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('fuser_person', account.person_id)::fuser.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function fuser.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions.';

create function fuser.current_person() returns fuser.person as $$
  select *
  from fuser.person
  where id = current_setting('jwt.claims.person_id')::integer
$$ language sql stable;

comment on function fuser.current_person() is 'Gets the person who was identified by our JWT.';

-- after schema creation and before function creation
alter default privileges revoke execute on functions from public;

grant usage on schema fuser to fuser_anonymous, fuser_person;

grant select on table fuser.person to fuser_anonymous, fuser_person;
grant update, delete on table fuser.person to fuser_person;

grant select on table fuser.post to fuser_anonymous, fuser_person;
grant insert, update, delete on table fuser.post to fuser_person;
grant usage on sequence fuser.post_id_seq to fuser_person;

grant execute on function fuser.person_full_name(fuser.person) to fuser_anonymous, fuser_person;
grant execute on function fuser.post_summary(fuser.post, integer, text) to fuser_anonymous, fuser_person;
grant execute on function fuser.person_latest_post(fuser.person) to fuser_anonymous, fuser_person;
grant execute on function fuser.search_posts(text) to fuser_anonymous, fuser_person;
grant execute on function fuser.authenticate(text, text) to fuser_anonymous, fuser_person;
grant execute on function fuser.current_person() to fuser_anonymous, fuser_person;

grant execute on function fuser.register_person(text, text, text, text) to fuser_anonymous;

alter table fuser.person enable row level security;
alter table fuser.post enable row level security;

create policy select_person on fuser.person for select
  using (true);

create policy select_post on fuser.post for select
  using (true);

create policy update_person on fuser.person for update to fuser_person
  using (id = current_setting('jwt.claims.person_id')::integer);

create policy delete_person on fuser.person for delete to fuser_person
  using (id = current_setting('jwt.claims.person_id')::integer);

create policy insert_post on fuser.post for insert to fuser_person
  with check (author_id = current_setting('jwt.claims.person_id')::integer);

create policy update_post on fuser.post for update to fuser_person
  using (author_id = current_setting('jwt.claims.person_id')::integer);

create policy delete_post on fuser.post for delete to fuser_person
  using (author_id = current_setting('jwt.claims.person_id')::integer);


commit;
