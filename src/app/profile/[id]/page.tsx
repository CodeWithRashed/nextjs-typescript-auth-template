

const Profile = ({params}:any) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Profile:
      <h1>{params.id}</h1>
    </div>
  )
}

export default Profile
