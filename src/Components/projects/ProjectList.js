// Component import
import { DateTime } from "luxon"
import toast, { Toaster } from 'react-hot-toast'
import DataTable from "react-data-table-component"
import SeacrhBar from "./SearchBar"
import NewDeleteButton from "../assets/buttons/NewDelete"
import NewProjectModal from "../modals/NewProjectModal"
import DeleteProjectModal from "../modals/DeleteProjectModal"
import NoDataComponent from "../project_info/NoDataComponent"

// Hook import
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

// Redux toolkit reducer import
import { changeModalStatus } from "../../features/modalSlice/modalSlice"
import { addProjectTab } from "../../features/project_tabs/projectTabSlice"
import { openProject } from "../../features/appIndexSlice/appIndexStatusSlice"

// CSS import
import "bootstrap/dist/css/bootstrap.min.css"


function ProjectList() {
  // Hooks
  const dispatch = useDispatch()

  // Redux state
  const projectList = useSelector(state => state.projectList)


  // React state
  const [filteredProjects, filterProjects] = useState(projectList)

  const [filteringStatus, setFilteringStatus] = useState(false)

  const [selectedProject, setSelectedProject] = useState("")

  const [windowResolution, setWindowResolution] = useState({
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  })

  const [nextUpdate, setNextUpdate] = useState(true)

  window.addEventListener('resize', () => {
    if (nextUpdate){
      setWindowResolution({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
      })
      setNextUpdate(false)
      setTimeout(() => {
        setNextUpdate(true)
      }, 2000)
    }
  })


  // Material request status light
  const getMaterialRequestStatus = (partList) => {
    let requestStatus = []

    for (let i = 0; i < partList.length; i++){
      let materialRequestList = partList[i].materialRequest.requestList

      if (materialRequestList.length === 0){
        requestStatus.push("Sin solicitar")
      } else if (materialRequestList.find(materialRequest => materialRequest.status === "Solicitado")){
        requestStatus.push("Solicitado")
      } else if (materialRequestList.find(materialRequest => materialRequest.status === "Comprado")){
        requestStatus.push("Comprado")
      } else if (materialRequestList.find(materialRequest => materialRequest.status === "Habilitado")){
        requestStatus.push("Habilitado")
      } else if (materialRequestList.find(materialRequest => materialRequest.status === "Entregado")){
        requestStatus.push("Entregado")
      }
    }

    if (requestStatus.includes("Sin solicitar")){
      return "Sin solicitar"
    } else if (requestStatus.length === 0){
      return "Sin solicitar"
    } else if (requestStatus.includes("Solicitado")){
      return "Solicitado"
    } else if (requestStatus.includes("Comprado")){
      return "Comprado"
    } else if (requestStatus.includes("Habilitado")){
      return "Habilitado"
    } else if (requestStatus.includes("Entregado")){
      return "Entregado"
    }
  }


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
      selector: (row) => row.projectInfo.microsipOt,
      sortable: true,
      width: "7%",
      center: true
    },
    {
      name: "Nombre",
      selector: (row) => row.projectInfo.name,
      sortable: false,
      with: '21%',
      center: true,
      wrap: true
    },
    {
      name: "Estado",
      selector: (row) => row.projectInfo.status,
      sortable: false,
      width: '7%',
      center: true
    },
    {
      name: "Cliente",
      selector: (row) => row.projectInfo.client,
      sortable: false,
      width: '13%',
      center: true
    },
    {
      name: "Solicitante",
      selector: (row) => row.projectInfo.clientUser,
      sortable: false,
      width: "15%",
      center: true
    },
    {
      name: "Material",
      selector: (row) => getMaterialRequestStatus(row.parts),
      sortable: true,
      center: true,
      conditionalCellStyles: [
        {
          when: row => getMaterialRequestStatus(row.parts) === "Sin solicitar",
          style: {
            color: 'white',
            backgroundColor: 'red',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.parts) === "Solicitado",
          style: {
            color: 'black',
            backgroundColor: 'orange',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.parts) === "Comprado",
          style: {
            color: 'black',
            backgroundColor: 'yellow',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.parts) === "Habilitado",
          style: {
            color: 'white',
            backgroundColor: 'blue',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => getMaterialRequestStatus(row.parts) === "Entregado",
          style: {
            color: 'white',
            backgroundColor: 'green',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
      ],
      width: "8%"
    },
    {
      name: "Fecha de inicio",
      selector: (row) => {
        return DateTime.fromISO(row.projectInfo.startDate).toLocaleString(DateTime.DATE_MED);
      },
      sortable: false,
      width: "9%",
      center: true
    },
    {
      name: "Fecha estimada",
      selector: (row) => {
        return DateTime.fromISO(row.projectInfo.estimatedFinishDate).toLocaleString(DateTime.DATE_MED);
      },
      conditionalCellStyles: [
        {
          when: row => (
            (DateTime.fromISO(row.projectInfo.estimatedFinishDate)
              .diff(DateTime.fromISO(row.startDate), 'days').days < 3 &&
            DateTime.fromISO(row.projectInfo.estimatedFinishDate)
              .diff(DateTime.fromISO(row.startDate), 'days').days > 0) && row.projectInfo.status !== "Terminado"
          ),
          style: {
            backgroundColor: 'yellow',
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
        {
          when: row => (
            DateTime.fromISO(row.projectInfo.estimatedFinishDate)
              .diff(DateTime.fromISO(row.startDate), 'days').days < 0 && row.projectInfo.status !== "Terminado"
          ),
          style: {
            backgroundColor: 'red',
            color: "white",
            borderRadius: "8px",
            margin: "4px 0"
          }
        },
      ],
      sortable: false,
      width: "9%",
      center: true
    },
    {
      name: "Fecha de cierre",
      selector: (row) => {
        if (row.projectInfo.finishDate === ""){
          return "Sin fecha"
        } else {
          return DateTime.fromISO(row.projectInfo.finishDate).toLocaleString(DateTime.DATE_MED);
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
  ]


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
        height: `${projectList.length === 0 ?
            parseInt(windowResolution.height - 100) :
          filteringStatus ?
            `${filteredProjects.length === 0 ?
              parseInt(windowResolution.height - 100) :
              parseInt(windowResolution.height - 152)
            }` :
          parseInt(windowResolution.height - 152)}px`
      }
    },
  }


  // Pagination config
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  
  // Conditional row styles
  let conditionalRowStyles = [
    {
      when: row => row.ot === selectedProject,
      style: {
        backgroundColor: 'rgb(21 128 61)',
        color: 'white',
      }
    },
  ]


  // Select row function
  const selectRow = (ot) => {
    setSelectedProject(ot)
  }


  // Double click row function
  const addNewTab = (projectOt) => {
    dispatch(addProjectTab(projectOt))
    dispatch(openProject({
      ot: projectOt
    }))
  }


  // NewDeleteButton functions
  const newBtn = () => {
    dispatch(changeModalStatus(
      {
        modalName: "newProject",
        modalStatus: true
      }
    ))
  }


  const searchInput = (input) => {
    if (input.value.length < 1){
      setFilteringStatus(false)
    } else {
      setFilteringStatus(true)
    }

    let inputValue = input.value.toLowerCase()
    let search = projectList.filter((project) => {
      if (project.ot.includes(inputValue) || 
        project.projectInfo.microsipOt.includes(inputValue) || 
        project.projectInfo.name.toLowerCase().includes(inputValue) || 
        project.projectInfo.status.toLowerCase().includes(inputValue) || 
        project.projectInfo.client.toLowerCase().includes(inputValue) || 
        project.projectInfo.clientUser.toLowerCase().includes(inputValue) ||
        getMaterialRequestStatus(project.parts).toLowerCase().includes(inputValue) ||
        DateTime.fromISO(project.projectInfo.startDate).toLocaleString(DateTime.DATE_MED).toLowerCase()
          .includes(inputValue) ||
        DateTime.fromISO(project.projectInfo.estimatedFinishDate).toLocaleString(DateTime.DATE_MED).toLowerCase()
          .includes(inputValue) ||
        DateTime.fromISO(project.projectInfo.finishDate).toLocaleString(DateTime.DATE_MED).toLowerCase()
          .includes(inputValue) ||
        (("sin fecha").includes(inputValue) && project.projectInfo.finishDate.toLowerCase() === "") ||
        project.projectInfo.materialStatus.toLowerCase().includes(inputValue)
      ){
        return project
      }
    })
    filterProjects([...search])
  }


  const deleteBtn = () => {
    if (selectedProject === ""){
      toast.error("No se ha seleccionado ningún proyecto")

    } else {
      dispatch(changeModalStatus({
        modalName: 'deleteProject',
        modalStatus: true
      }))
    }
  }


  const successNotify = (message) => {
    toast.success(message)
  }


  // Modal window selector
  const modalStatus = useSelector(state => state.modalStatus)
  let modalWindow
  if (modalStatus.deleteProject){
    modalWindow = <DeleteProjectModal
      ot={selectedProject}
      successFn={successNotify}
    />
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
    <div className="mt-2">
      <div 
        className="mb-2 flex items-center gap-4 w-full"
      >
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
          noDataComponent={<NoDataComponent/>}
        />
      </div>

      {modalWindow}

      <Toaster
        toastOptions={{
          position: "top-center",
          duration: 2000,
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
