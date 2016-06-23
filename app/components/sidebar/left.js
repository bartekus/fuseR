function user_profile_clicked()
{
    // router.push("userProfile");
    console.log('goto userProfile');
}

function settings_clicked()
{
    // router.push("settings");
    console.log('goto settings');
}

function logout_clicked()
{
    // router.goto("login");
    console.log('goto login');
}



module.exports = {
  user_profile_clicked: user_profile_clicked,
  settings_clicked: settings_clicked,
  logout_clicked: logout_clicked
};
