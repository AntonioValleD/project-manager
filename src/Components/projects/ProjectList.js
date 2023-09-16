import { DateTime } from "luxon";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeModalStatus } from "../../features/modalSlice/modalSlice";
import { updateSelectedProject } from "../../features/projects/selectedProjectSlice";
import { addProjectTab } from "../../features/project_tabs/projectTabSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from 'react-hot-toast';
import DataTable from "react-data-table-component";
import SeacrhBar from "./SearchBar";
import NewDeleteButton from "../assets/buttons/NewDelete";
import NewProjectModal from "../modals/NewProjectModal";
import DeleteProjectModal from "../modals/DeleteProjectModal";


function ProjectList() {
  // Hooks
  const dispatch = useDispatch();


  // Redux state
  const selectedProjectOt = useSelector(state => state.selectedProject).selected;
  const projectList = useSelector(state => state.projectList);


  // React state
  const [filteredProjects, filterProjects] = useState(projectList);

  
  // Table columns definition
  const columns = [
    {
      id: 'main',
      name: "O.T.",
      selector: (row) => row.ot,
      sortable: true,
      width: "5%",
      center: true,
    },
    {
      name: "Microsip",
      selector: (row) => row.microsipOt,
      sortable: true,
      width: "7%",
      center: true
    },
    {
      name: "Nombre",
      selector: (row) => row.projectName,
      sortable: false,
      with: '21%',
      center: true,
      wrap: true
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: false,
      width: '7%',
      center: true
    },
    {
      name: "Cliente",
      selector: (row) => row.client,
      sortable: false,
      width: '13%',
      center: true
    },
    {
      name: "Solicitante",
      selector: (row) => row.clientUser,
      sortable: false,
      width: "15%",
      center: true
    },
    {
      name: "Material",
      selector: (row) => {
        if (row.materialRequestQuantity){
          if (row.materialRequestQuantity <= 0){
            return "Sin solicitar";
          } else if (row.materialRequestQuantity > 0 && row.materialRequestQuantity < row.partModelsQuantity){
            return "Incompleto";
          } else {
            return "Solicitado";
          }
        } else {
          return "Sin solicitar";
        }
      },
      sortable: true,
      center: true,
      width: "8%"
    },
    {
      name: "Fecha de inicio",
      selector: (row) => {
        return DateTime.fromISO(row.startDate).toLocaleString(DateTime.DATE_MED);
      },
      sortable: false,
      width: "9%",
      center: true
    },
    {
      name: "Fecha estimada",
      selector: (row) => {
        return DateTime.fromISO(row.estimatedFinishDate).toLocaleString(DateTime.DATE_MED);
      },
      sortable: false,
      width: "9%",
      center: true
    },
    {
      name: "Fecha de cierre",
      selector: (row) => {
        if (row.finishDate === ""){
          return "N/A"
        } else {
          return DateTime.fromISO(row.finishDate).toLocaleString(DateTime.DATE_MED);
        }
      },
      sortable: false,
      width: "9%",
      center: true
    },
    {
      name: "Selected row",
      selector: (row) => row.selected,
      sortable: false,
      omit: true,
    },
  ];

  // Custom styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      }
    },
    headCells: {
      style: {
        borderBottom: "1px solid black",
        backgroundColor: 'rgb(23 37 84)',
        color: 'white',
        paddingLeft: "8px",
        paddingRight: "0px",
        fontSize: "14px",
        textAlign: 'center'
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingRight: "0px",
        paddingLeft: "0px",
        textAlign: 'center',
        userSelect: 'none',
      },
    },
    table: {
      style: {
        minHeight: "525px"
      }
    },
  };


  // Pagination config
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  
  // Conditional row styles
  let conditionalRowStyles = [
    {
      when: row => row.ot === selectedProjectOt,
      style: {
        backgroundColor: 'rgb(21 128 61)',
        color: 'white',
      }
    },
  ];

  // Select row function
  const selectRow = async (ot) => {
    dispatch(updateSelectedProject(ot));
  };

  // Double click row function
  const addNewTab = (projectOt) => {
    dispatch(addProjectTab(projectOt));
  };

  // NewDeleteButton functions
  const newBtn = () => {
    dispatch(changeModalStatus(
      {
        modalName: "newProject",
        modalStatus: true
      }
    ))
  };
  const searchInput = (input) => {
    let inputValue = input.value.toLowerCase();
    let search = projectList.filter((project) => {
      if (project.ot.includes(inputValue) || 
        project.microsipOt.includes(inputValue) || 
        project.projectName.toLowerCase().includes(inputValue) || 
        project.status.toLowerCase().includes(inputValue) || 
        project.client.toLowerCase().includes(inputValue) || 
        project.clientUser.toLowerCase().includes(inputValue) ||
        project.startDate.toLowerCase().includes(inputValue) ||
        project.estimatedFinishDate.toLowerCase().includes(inputValue) ||
        project.finishDate.toLowerCase().includes(inputValue) || 
        project.materialStatus.toLowerCase().includes(inputValue)
      ){
        return project;
      }
    });
    filterProjects([...search])
  };

  const deleteBtn = () => {
    if (selectedProjectOt){
      dispatch(changeModalStatus({modalName: 'delete', modalStatus: true}));
    } else if (selectedProjectOt === ''){
      dispatch(changeModalStatus({modalName: 'noProjectSelected', modalStatus: true}));
    }
  };


  const successNotify = (message) => {
    toast.success(message);
  };


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus);
  let modalWindow;
  if (modalStatus.delete){
    modalWindow = <DeleteProjectModal
      successFn={successNotify}
    />
  } else if (modalStatus.noProjectSelected){
    toast.success("Esta es una nueva notificación!");
    dispatch(changeModalStatus({
      modalName: "noProjectSelected",
      modalStatus: false,
    }))
  } else if (modalStatus.newProject) {
    modalWindow = <NewProjectModal
      textTitle="Nuevo proyecto"
      successFn={successNotify}
    />
  }


  useEffect(() => {
    filterProjects(projectList)
  },[projectList])
  

  return (
    <div className="w-full px-2 pt-2 rounded-sm">
      <div className="mb-4 flex items-center gap-4 w-full">
        <SeacrhBar
          inputText={searchInput}
        />
        <NewDeleteButton
          newBtn={newBtn}
          deleteBtn={deleteBtn}
        />
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredProjects}
          responsive
          striped
          selectableRowsHighlight
          highlightOnHover
          fixedHeader
          persistTableHead
          customStyles={customStyles}
          onRowClicked={row => selectRow(row.ot)}
          onRowDoubleClicked={row => addNewTab(row.ot)}
          conditionalRowStyles={conditionalRowStyles}
          defaultSortFieldId={'main'}
          defaultSortAsc={true}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          paginationPerPage={15}
        />
      </div>
      {modalWindow}
      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '2px',
          },
        }}
      />
    </div>
  );
}

export default ProjectList;
