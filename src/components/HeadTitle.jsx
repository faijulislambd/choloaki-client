const HeadTitle = ({ first, last }) => {
  return (
    <div className="mx-auto font-bold text-center md:w-1/2 my-8  dark:text-white">
      <h3 className="text-3xl uppercase py-4">
        {first}
        {last && <span className="text-primary ms-2">{last}</span>}
      </h3>
    </div>
  );
};

export default HeadTitle;
