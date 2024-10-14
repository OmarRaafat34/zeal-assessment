import millionaire from "../../assets/images/logo.png";
import StartModal from "../../components/startModal/startModal";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={millionaire} alt="millionaire-logo" className="w-1/3" />
      <StartModal />
    </div>
  );
};

export default Home;
