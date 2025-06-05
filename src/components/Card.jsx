import skipImage1 from "../assets/10-yarder-skip.jpg";
import skipImage2 from "../assets/skipImage2.jpeg";
import skipImage3 from "../assets/skipImage3.jpg";
import skipImage4 from "../assets/skipImage4.webp";
import skipImage5 from "../assets/skipImage5.webp";
import skipImage6 from "../assets/skipImage6.jpg";

const Card = ({ item, setSelectedSkip, selectedSkip }) => {
  const handleSelectedSkip = () => {
    if (selectedSkip.id === item.id) {
      setSelectedSkip({});
    } else {
      setSelectedSkip({
        id: item.id,
        size: item.size,
        price_before_vat: item.price_before_vat,
        hire_period_days: item.hire_period_days,
      });
    }
  };

  const skipImages = [
    skipImage1,
    skipImage2,
    skipImage3,
    skipImage4,
    skipImage5,
    skipImage6,
  ];
  const skipImageIndex = Math.floor(Math.random() * (skipImages.length - 1));
  return (
    <div
      className={`p-4 rounded-lg flex flex-col gap-[1rem] transition-all border-2 shadow-lg ${
        selectedSkip.id === item.id
          ? "border-[var(--primary)] shadow-[#218021]"
          : "border-black"
      } hover:border-[var(--primary)] cursor-pointer`}
      onClick={handleSelectedSkip}
    >
      <div
        className="relative rounded-md w-full min-h-[30vh] max-h-[50vh] mx-auto"
        style={{
          backgroundImage: `url(${skipImages[skipImageIndex]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span className="absolute top-2 left-1 py-1 px-2 bg-[var(--secondary)] rounded-xl font-bold">
          {item.size} Yards
        </span>
        {!item.allowed_on_road && (
          <span className="absolute text-sm bottom-2 right-1 py-1 px-2 bg-[tomato] text-white rounded-md font-bold animate-pulse">
            <i className="fas fa-warning"></i> Not allowed on road
          </span>
        )}
      </div>
      <h2>{item.size || 0} Yard Skip</h2>
      <h4 className="text-[var(--secondary)]">
        {item.hire_period_days || 0} day hire period
      </h4>
      <span className="text-[var(--primary)] text-2xl md:text-4xl font-bold">
        £{item.price_before_vat || 0}
      </span>
      <div
        className={`${
          selectedSkip.id === item.id
            ? "bg-[var(--primary)] text-white"
            : "bg-green-200"
        } p-4 rounded-md text-center text-lg`}
      >
        {selectedSkip.id === item.id ? (
          "Selected"
        ) : (
          <>
            Select This Skip <i className="fas fa-arrow-right"></i>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
