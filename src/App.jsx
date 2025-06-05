import { useEffect, useState } from "react";
import Card from "./components/Card";
import ScrollUp from "./components/ScrollUp";
import axios from "axios";

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState({});
  const [view, setView] = useState(localStorage.getItem("view"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        setSkips(response.data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main>
        {/* Navigation */}
        <div className="flex my-[2rem] justify-center gap-[2rem] md:justify-between py-2 px-4 flex-wrap">
          {[
            {
              text: "Postcode",
              icon: "fas fa-location-pin",
            },
            {
              text: "Waste Type",
              icon: "fas fa-trash",
            },
            {
              text: "Select Skip",
              icon: "fas fa-truck",
            },
            {
              text: "Permit Check",
              icon: "fas fa-shield",
            },
            {
              text: "Choose Date",
              icon: "fas fa-calendar",
            },
            {
              text: "Payment",
              icon: "fas fa-credit-card",
            },
          ].map((item, index) => (
            <a
              className={`flex items-center gap-[0.5rem] text-lg font-medium ${
                index === 2
                  ? "text-[var(--primary)]"
                  : "text-[#aaa] hover:underline hover:text-[var(--secondary)]"
              }`}
              key={index}
              href="/"
            >
              <i className={item.icon}></i> {item.text}
            </a>
          ))}
        </div>
        <h1 className="text-center mb-[1rem] text-3xl font-bold ">
          Choose Your Skip Size
        </h1>
        <p className="text-center mb-[1rem] text-[1.1rem] text-[var(--primary)]">
          Select the skip size that best suits your needs.
        </p>
        {/* Grid/List view toggle */}
        <div className="my-[1rem] flex pl-[2rem] justify-start gap-[1rem] sticky top-4 z-50">
          <button
            className={`text-white rounded-md w-[3rem] h-[3.5rem] cursor-pointer text-3xl outline-none border-none ${
              view === "grid"
                ? "bg-[#aaa] opacity-50"
                : "opacity-100 bg-[var(--secondary)]"
            }`}
            onClick={() => {
              setView("grid");
              localStorage.setItem("view", "grid");
            }}
            title="Change to grid view"
          >
            <i className="fas fa-table-cells"></i>
          </button>
          <button
            className={`text-white rounded-md w-[3rem] h-[3.5rem] cursor-pointer text-3xl outline-none border-none ${
              view === "list"
                ? "bg-[#aaa] opacity-50"
                : "opacity-100 bg-[var(--secondary)]"
            }`}
            onClick={() => {
              setView("list");
              localStorage.setItem("view", "list");
            }}
            title="Change to list view"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {/* Main section for displaying the skips */}
        <section className="flex justify-center transition-all">
          <div
            className={`mx-auto my-[1rem] grid p-[1rem] gap-[2rem] md:gap-[1rem] transition-all ${
              view === "list"
                ? "grid-cols-1 w-full md:w-3/4"
                : "w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {/* Loading animation */}
            {loading && (
              <>
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="h-[70vh] bg-[#aaa] animate-pulse rounded-lg"
                  ></div>
                ))}
              </>
            )}
            {!loading && (
              <>
                {skips.length > 0 ? (
                  skips.map((item, index) => (
                    <Card
                      key={index}
                      item={item}
                      setSelectedSkip={setSelectedSkip}
                      selectedSkip={selectedSkip}
                    />
                  ))
                ) : (
                  <h2 className="font-bold text-xl">No data available</h2>
                )}
              </>
            )}
          </div>
          {selectedSkip.id && (
            <aside className="fixed bottom-0 md:sticky md:top-0 md:right-0 w-full md:w-[30vw] md:h-[100dvh] p-4 bg-[var(--secondary)]">
              <p className="text-[green] font-bold hidden md:block">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </p>
              <div className="my-[0.5rem] flex justify-between flex-col gap-[1rem]">
                <div className="flex items-center gap-[1rem]">
                  <span>{selectedSkip.size} Yard Skip</span>
                  <span className="text-[green] text-3xl font-bold">
                    £{selectedSkip.price_before_vat}
                  </span>
                  <span>{selectedSkip.hire_period_days} day hire</span>
                </div>
                <div className="grid items-center gap-[1rem]">
                  <button className="p-2 rounded-md bg-green-200 cursor-pointer hover:opacity-90">
                    Back
                  </button>
                  <button className="p-2 rounded-md bg-[var(--primary)] cursor-pointer hover:opacity-90 text-white">
                    Continue <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </aside>
          )}
        </section>
      </main>
      <ScrollUp />
    </>
  );
}

export default App;
