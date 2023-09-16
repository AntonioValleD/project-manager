import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { bootstrapQualityInfo, selectQualityUnit, editSelectedQualityMeasure } from "../../features/partsSlice.js/partsSlice";
import NoDataComponent from "../project_info/NoDataComponent";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";


function QualityTable() {
  // Hooks
  const dispatch = useDispatch();


  // Redux selectors
  const partOt = useSelector((state) => state.projectTabs).find(
    (tab) => tab.selected === true
  ).id;

  const partId = useSelector((state) => state.selectedPart).find(
    (part) => part.ot === partOt
  ).partId;


  // Table columns definition
  const partInfo = useSelector((state) => state.partList)
    .find((project) => project.ot === partOt)
    .parts.find((part) => part.id === partId);

  const unitList = partInfo.qualityTable;


  // Check state info
  useEffect(() => {
    if (parseInt(partInfo.quantity) !== partInfo.qualityTable.length){
      dispatch(bootstrapQualityInfo({
        ot: partOt,
        partId: partId,
      }))
    } else {
      dispatch(selectQualityUnit({
        ot: partOt,
        partId: partId,
        unitId: "1",
      }))
    }
  }, [])

  const selectedUnit = unitList.find((unit) => unit.selected === true);
  var measureList = [];
  if (selectedUnit){
    measureList = selectedUnit.measures;
  }


  // Data table columns definition
  const columns = [
    {
      name: "No.",
      selector: (row) => row.measureId,
      center: true,
      width: "12%",
    },
    {
      name: "Cota",
      selector: (row) => row.cota,
      center: true,
      width: "21%",
    },
    {
      name: "Tolerancia",
      selector: (row) => row.tolerance,
      center: true,
      width: "37%",
    },
    {
      name: "Medición",
      selector: (row) => row.measure,
      center: true,
      width: "30%",
    },
  ];


  // Data table custom styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px", // override the row height
      },
    },
    headCells: {
      style: {
        borderBottom: "1px solid black",
        backgroundColor: "rgb(59 7 100)",
        color: "white",
        paddingLeft: "8px",
        paddingRight: "0px",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingRight: "0px",
        paddingLeft: "0px",
        userSelect: "none",
      },
    },
    table: {
      style: {
        minHeight: "600px"
      }
    },
  };


  // Conditional row styles
  let conditionalRowStyles = [
    {
      when: (row) => row.measureId % 2 === 0,
      style: {
        backgroundColor: "#d0d0d0",
        color: "black",
      },
    },
    {
      when: (row) => row.measureId % 2 !== 0,
      style: {
        backgroundColor: "#fafafa",
        color: "black",
      },
    },
    {
      when: (row) => row.selected === true,
      style: {
        backgroundColor: "rgb(21 128 61",
        color: "white",
      },
    },
  ];


  // Click row function
  const selectPartMeasure = (measureId) => {
    dispatch(
      editSelectedQualityMeasure({
        ot: partOt,
        partId: partId,
        measureId: measureId,
      })
    );
  };


  // Double click row function
  const addRealMeasure = () => {
    dispatch(changeModalStatus({
      modalName: "addRealMeasure",
      modalStatus: true,
    }))
  };


  return (
    <div className="w-full h-fit">
      <DataTable
        columns={columns}
        noDataComponent={<NoDataComponent
          textInfo='Haga click en el botón "Nuevo" para agregar una medida'
        />}
        data={measureList ? measureList : []}
        responsive
        striped
        highlightOnHover
        fixedHeader
        persistTableHead
        customStyles={customStyles}
        onRowClicked={(row) => selectPartMeasure(row.measureId)}
        onRowDoubleClicked={() => addRealMeasure()}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}

export default QualityTable;
