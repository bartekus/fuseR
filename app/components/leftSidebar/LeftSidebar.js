function user_profile_clicked()
{
    router.push("userProfile");
}

function settings_clicked()
{
    router.push("settings");
}

function logout_clicked()
{
    // TODO: invalidate login credentials

    router.goto("login");
}



module.exports = {
  user_profile_clicked: user_profile_clicked,
  settings_clicked: settings_clicked,
  logout_clicked: logout_clicked
};
