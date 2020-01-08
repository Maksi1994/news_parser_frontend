export default function ({store, redirect}) {

  if (!store.getters['users/isAdmin']) {
  //  return redirect('/');
  }
}
