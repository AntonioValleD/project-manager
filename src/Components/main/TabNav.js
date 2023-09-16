import { useState, useEffect } from "react";


function TabNav(props) {
  // Local component state
  const [tabList, setTabList] = useState(props.data);
  const [startIndex, setStartIndex] = useState(0);


  // Increase/Decrease start index 
  const increaseStartIndex = () => {
    let totalTabs = props.data.length;
    if ((totalTabs - startIndex) > 6){
      setStartIndex(startIndex + 1);
    }
  };

  const decreaseStartIndex = () => {
    if (startIndex > 0){
      setStartIndex(startIndex - 1);
    }
  };
  

  useEffect(() => {
    if (props.data.length > 6){
      setStartIndex(props.data.length - 6);
    }
  }, [])

  useEffect(() => {
    if (props.data.length > 6){
      let counter = startIndex;
      if (counter < 0){
        counter = 0;
      }

      let shortTabList = [];
      for (let i = 0; i < 6; i ++){
        shortTabList.push(props.data[counter]);
        counter ++;
      }
      setTabList([...shortTabList]);
    } else {
      setTabList([...props.data]);
    }
  }, [props.data, startIndex])


  
  return (
    <div className="flex items-center h-full gap-2 select-none">
      <button 
        className={`flex bg-purple-800 rounded-sm h-7 py-2 px-3 items-center text-l font-normal text-white`}
        onClick={() => props.goHome()}
      >
        Inicio
      </button>
      {
        props.data.length > 6 ?
        <label 
          className={`flex h-6 px-1 items-center text-sm font-normal text-white cursor-pointer ${startIndex === 0 ? 'bg-blue-950' : 'bg-blue-900'} rounded-sm`}
          onClick={() => decreaseStartIndex()}
        >
          {"<"}
        </label> :
        ""
      }
      {tabList.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center ${tab.selected ? 'bg-blue-800': 'bg-blue-950'}  hover:bg-blue-800 rounded-sm h-full transition-all duration-75`}
        >
          <label 
            className={`flex ${tab.selected ? 'h-5' : 'h-4'} m-1 pl-2 py-2 items-center text-sm font-normal text-white cursor-pointer `}
            onClick={() => props.showTab(tab.id)}
          >
            {`${props.text ? props.text : ''} ${tab.id}`}
          </label>
          <label 
            className="flex h-4 m-1 px-2 py-2 items-center text-sm font-normal text-white cursor-pointer border-white border-l"
            onClick={() => props.closeTab(tab.id)}
          >
            X
          </label>
        </div>
      ))}
      {
        props.data.length > 6 ?
        <label 
          className={`flex h-6 px-1 items-center text-sm font-normal text-white cursor-pointer ${(props.data.length - startIndex) <= 6 ? 'bg-blue-950' : 'bg-blue-900'} rounded-sm`}
          onClick={() => increaseStartIndex()}
        >
          {">"}
        </label> :
        ""
      }
    </div>
  );
}

export default TabNav;
