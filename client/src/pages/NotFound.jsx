import { useNavigate } from "react-router-dom";
const NotFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-screen bg-gray-50 dark:bg-sigmaBackground flex justify-center items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-sigmaPrimary font-dark font-extrabold mb-8">
              {" "}
              404
            </div>
            <p className="text-2xl md:text-4xl font-light leading-normal mb-8">
              Looks like you have found the doorway to the great nothing !!
            </p>
            <p className="text-lg md:text-lg font-light leading-normal mb-8">
              Sorry about that! Please visit our hompage to get where you need
              to go.
            </p>

            <button
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-orange-500 "
              onClick={() => {
                navigate("/");
              }}
            >
              Back to HomePage
            </button>
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <img
              src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
              className=""
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
