export default async function ({ $auth, redirect, store }) {
    let user = $auth.$state.user
    if (user && user.id == 1) {
        //let the user in
    } else {
        store.dispatch("snackbars/setSnackbar", {
            color: 'red',
            text: `You must be an admin to view that page.`
        });
        //redirect them to
        redirect('/')
    }
}  