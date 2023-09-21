import ImageGenerator from "../components/ImageGeneration/ImageGenerator";
import BackgroundImage from "../components/common/BackgroundImage";
import SideSettingDrawer from "../components/common/SideSettingDrawer";

const ImageGeneratorPage: React.FC = () => {
  
  return (
    <BackgroundImage url="/images/background-images/dashboard-bg.jpeg">
      <ImageGenerator></ImageGenerator>
      <SideSettingDrawer></SideSettingDrawer>
    </BackgroundImage>
  );
};

export default ImageGeneratorPage;
