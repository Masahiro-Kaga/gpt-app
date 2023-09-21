import GptHandler from "../components/GptHandle/GptHandler";
import SideSettingDrawer from "../components/common/SideSettingDrawer";
import BackgroundImage from "../components/common/BackgroundImage";

const GptHandlerPage: React.FC = () => {
  return (
    <BackgroundImage url="/images/background-images/dashboard-bg.jpeg">
      <GptHandler></GptHandler>
      <SideSettingDrawer></SideSettingDrawer>
    </BackgroundImage>
  );
};

export default GptHandlerPage;
