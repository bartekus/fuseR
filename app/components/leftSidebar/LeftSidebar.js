function logout_clicked()
{
    // TODO: invalidate login credentials

    router.goto("login");
}

module.exports = { logout_clicked: logout_clicked };
