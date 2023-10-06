import Login from "../components/common/Login";
import BackgroundImage from "../components/common/BackgroundImage";

const LoginPage = () => {
  return (
    <div className="relative">
      <BackgroundImage url="/images/background-images/login_bg.jpeg" />
      <Login></Login>
    </div>
  );
};

export default LoginPage;
