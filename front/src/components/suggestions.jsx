export default function Suggestions({onClick}) {
    const fakeSuggest = ["Paris", "London", "Singapour", "Malaga", "Tokyo"];
  
    return (
      <div className="w-full flex flex-col items-center mb-5">
        <p className="text-gray-600 text-xl mb-5 mt-5">Suggestions</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
          {fakeSuggest.map((el, index) => {
            return (
              <div
                key={index}
                className="px-5 py-1 w-fit h-fit border-2 border-gray-300 rounded-lg hover:cursor-pointer hover:brightness-90"
                onClick={() => onClick(el)}
              >
                <p>{el}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }