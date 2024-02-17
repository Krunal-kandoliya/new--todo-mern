export function gettokn () {
  let user=localStorage.getItem('user')
  if(!user)return
  const objs=JSON.parse(user)
  return objs.token;
}


