import ZealInput from "../zealInput/zealInput";

const StartModal = () => {
  return (
    <div>
      <ZealInput
        name="Name"
        value=""
        placeholder="Enter your name"
        onInputChange={() => {}}
      />
    </div>
  );
};

export default StartModal;
