import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import '../../dashboard.css'
const CarInspectionReportAdd = () => {
    const [inspectionData, setInspectionData] = useState({
      radiatorCoreSupport: "",
      radiatorCoreSupportImages: "",
      rightStrutTowerApron: "",
      rightStrutTowerApronImages: "",
      leftStrutTowerApron: "",
      leftStrutTowerApronImages: "",
      rightFrontRail: "",
      rightFrontRailImages: "",
      leftFrontRail: "Non-Accidented",
      leftFrontRailImages: "",
      cowlPanelFirewall: "Non-Accidented",
      rightAPillar: "Non-Accidented",
      leftAPillar: "Non-Accidented",
      rightBPillar: "Non-Accidented",
      leftBPillar: "Non-Accidented",
      rightCPillar: "Non-Accidented",
      leftCPillar: "Non-Accidented",
      bootFloor: "Non-Accidented",
      bootFloorImages: "",
      bootLockPillar: "Non-Accidented",
      bootLockPillarImages: "",
      frontSubFrame: "Non-Accidented",
      frontSubFrameImages: "",
      rearSubFrame: "Non-Accidented",
      rearSubFrameImages: "Non-Accidented",

      //engine Model
      engineOilLevel: "Black",
      engineOilLevelImage: "",
      engineOilLeakage: "No Leakage",
      engineOilLeakageImage: "",
      transmissionOilLeakage: "No Leakage",
      transmissionOilLeakageImage: "",
      coolantLeakage: "No Leakage",
      brakeOilLeakage: "No Leakage",
      beltsFan: "Ok",
      beltsFanImage: "",
      wiresWiringHarness: "Ok",
      wiresWiringHarnessImage: "",
      engineBlowManualCheck: "Not Present",
      engineNoise: "No Noise",
      engineVibration: "No Vibration",
      coldStart: "Ok",
      engineMounts: "Ok",
      pulleysAdjuster: "Ok",
      hoses: "Ok",
      hosesImage: "",
      exhaustSound: "Ok",
      radiator: "Ok",
      radiatorImage: "",
      suctionFan: "Working",
      starterOperation: "Ok",

      //Brakes
      frontRightDisc: "Ok",
      frontLeftDisc: "Ok",
      frontRightBrakePad: "Ok",
      frontLeftBrakePad: "Ok",
      handBrake: "Ok",
      handBrakeImage: "",

      //Suspension
      steeringWheelPlay: "Ok",
      rightBallJoint: "Ok",
      leftBallJoint: "Ok",
      rightZLinks: "Ok",
      leftZLinks: "Ok",
      rightTieRodEnd: "Ok",
      leftTieRodEnd: "Ok",
      frontRightBoots: "Ok",
      frontLeftBoots: "Ok",
      frontRightBushes: "Ok",
      frontLeftBushes: "Ok",
      frontRightShock: "Ok",
      frontLeftShock: "Ok",
      rearRightBushes: "No Damage Found",
      rearLeftBushes: "No Damage Found",
      rearRightShock: "Ok",
      rearLeftShock: "Ok",
      rightBallJointImage: "",
      leftBallJointImage: "",
      rightZLinksImage: "",
      leftZLinksImage: "",
      rightTieRodEndImage: "",
      leftTieRodEndImage: "",
      frontRightBootsImage: "",
      frontLeftBootsImage: "",
      frontRightBushesImage: "",
      frontLeftBushesImage: "",
      frontRightShockImage: "",
      frontLeftShockImage: "",
      rearRightBushesImage: "",
      rearLeftBushesImage: "",
      rearRightShockImage: "",
      rearLeftShockImage: "",

      //Interior
      steeringWheelCondition: "Ok",
      steeringWheelConditionImage: "",
      steeringWheelButtons: "Working",
      horn: "Working",
      lightsLeverSwitch: "Working",
      wiperWasherLever: "Working",
      rightSideMirror: "Working",
      leftSideMirror: "Working",
      rearViewMirrorDimmer: "Showing Reflection",
      rightSeatAdjusterRecliner: "Working",
      leftSeatAdjusterRecliner: "Working",
      rightSeatAdjusterLearTrack: "Working",
      leftSeatAdjusterLearTrack: "Working",
      rightSeatBelt: "Working",
      leftSeatBelt: "Working",
      rearSeatBelts: "Working",
      gloveBox: "Working",
      frontRightPowerWindow: "Working Properly",
      frontLeftPowerWindow: "Working Properly",
      rearRightPowerWindow: "Working Properly",
      rearLeftPowerWindow: "Working Properly",
      autoLockButton: "Working",
      windowSafetyLock: "Working",
      interiorLightings: "Working",
      AC: "Working",
      defog: "Working",
      hazardLights: "Working",
      audioVideo: "Working",
      rearViewCamera: "Working",
      trunkReleaseLeverButton: "Working",
      fuelCapReleaseLeverButton: "Working",
      bonnetReleaseLeverButton: "Working",
      roof: "Perfect",
      floorMat: "Perfect",
      frontRightSeatPoshish: "Perfect",
      frontLeftSeatPoshish: "Perfect",
      rearSeatPoshish: "Perfect",
      dashboardCondition: "Perfect",
      dashboardConditionImage: "",
      spareTire: "Present",
      spareTireImage: "",
      toolKit: "Complete",
      toolKitImage: "",
      jack: "Present",
      jackImage: "",

      //Ac Heater
      acFitted: "Yes",
      acOperational: "Yes",
      blower: "Excellent Air Throw",
      cooling: "Excellent",
      heating: "Excellent",

      //Electronics
      computerCheckUp: "Ok",
      computerCheckUpImage: "",
      batteryWarningLight: "Not Present",
      oilPressureLowWarningLight: "Not Present",
      temperatureWarningLight: "Not Present",
      airBagWarningLight: "Not Present",
      powerSteeringWarningLight: "Not Present",
      absWarningLight: "Not Present",
      keyFobBatteryLowLight: "Not Present",
      batteryVoltage: 12,
      terminalsCondition: "Ok",
      terminalsConditionImage: "",
      charging: "Ok",
      alternatorOperation: "Ok",
      alternatorOperationImage: "",
      instrumentClusterGauges: "Working",
      instrumentClusterGaugesImage: "",

      //Exterior Body
      trunkLock: "Ok",
      frontWindshieldCondition: "Ok",
      frontWindshieldConditionImage: "",
      rearWindshieldCondition: "Ok",
      rearWindshieldConditionImage: "",
      frontRightDoorWindow: "Ok",
      frontLeftDoorWindow: "Ok",
      rearRightDoorWindow: "Ok",
      rearLeftDoorWindow: "Ok",
      windscreenWiper: "Cleaning Properly",
      rightHeadlightWorking: "Working",
      leftHeadlightWorking: "Working",
      rightHeadlightCondition: "Perfect",
      leftHeadlightCondition: "Perfect",
      rightTaillightWorking: "Working",
      leftTaillightWorking: "Working",
      rightTaillightCondition: "Perfect",
      leftTaillightCondition: "Perfect",
      fogLightsWorking: "Working",

      //Tyres
      frontRightTyreBrand: "Eurostar",
      frontRightTyreImage: "",
      frontLeftTyreBrand: "Eurostar",
      frontLeftTyreImage: "",
      rearRightTyreBrand: "Eurostar",
      rearRightTyreImage: "",
      rearLeftTyreBrand: "Eurostar",
      rearLeftTyreImage: "",
      tyreSize: "",
      rims: "alloy",
      wheelCaps: "Present",
      
      //Test Drive
      enginePick: "Ok",
      driveShaftNoise: "No Noise",
      gearShiftingAutomatic: "Smooth",
      brakePedalOperation: "Timely Response",
      absOperation: "Timely Response",
      frontSuspension: "No Noise",
      rearSuspension: "No Noise",
      steeringOperation: "Smooth",
      steeringWheelAlignment: "Centered",
      acOperation: "Perfect",
      heaterOperation: "Perfect",
      speedometer: "Working",
      testDriveDoneBy: "Technician"


    });

    const [bodyFrameFormId, setBodyFrameFormId] = useState('');
    const [engineFormId, setEngineFormId] = useState('');
    const [brakesFormId, setBrakesFormId] = useState('');
    const [suspensionFormId, setSuspensionFormId] = useState('');
    const [interiorFormId, setInteriorFormId] = useState('');
    const [acHeaterFormId, setAcHeaterFormId] = useState('');
    const [electronicsFormId, setElectronicsFormId] = useState('');
    const [exteriorBodyFormId, setExteriorBodyFormId] = useState('');
    const [tyresFormId, setTyresFormId] = useState('');
    const [testDriveFormId, setTestDriveFormId] = useState('');
    // const carDetailsId=useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carDetailsId = searchParams.get('carDetailsId');
    const [carInspectionReportId,setCarInspectionReportId]=useState("")

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let name=event.target.name
      reader.onload = () => {
        setInspectionData(prev=>{
          return{...prev,[name]:reader.result}
        })
        // console.log(reader.result); 
      };
    }
  };

  // function handletest(){
  // console.log();

  // }
  // console.log(inspectionData);
  function changeHandler(e){
  //  let name=e.target.name;
   setInspectionData(prev=>{
return{...prev, [e.target.name]: e.target.value}
   })
  }

 
  function extractDataUpToKey(data, key) {
    const extractedData = {};
    for (const property in data) {
      extractedData[property] = data[property];
      if (property === key) {
        break;
      }
    }
    return extractedData;
  }
  

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const dataToSend = extractDataUpToKey(inspectionData, 'rearSubFrameImages');
      const response=await axios.post("https://autofinder-backend.vercel.app/api/bodyFrameAccident/create",dataToSend)
      // console.log(response.data.data._id);
      setBodyFrameFormId(response.data.data._id)
    }
    catch(error){
      console.log(error.message);
    }
  }



  async function handleEngineSubmit(e) {
    e.preventDefault();
    try {
      const dataToSend = extractDataUpToKey(inspectionData, 'starterOperation');
      const response = await axios.post("https://autofinder-backend.vercel.app/api/engine/create", dataToSend);
      // console.log(response.data.data);
      setEngineFormId(response.data.data._id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleBrakeSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,'handBrakeImage')
      const response=await axios.post("https://autofinder-backend.vercel.app/api/brakes/create",dataToSend)
      console.log(response.data.data);
      setBrakesFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleSuspensionSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"rearLeftShockImage")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/suspension/create",dataToSend)
      // console.log(response.data.data._id);
      setSuspensionFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);
    }

  }
  
  async function handleInteriorSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"jackImage")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/interior/create",dataToSend)
      // console.log(response.data.data);
      setInteriorFormId(response.data.data._id)
    } catch (error) {
        console.log(error.message);
    }
  }

  async function handleAcHeaterSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"heating")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/acheater/create",dataToSend)
      // console.log(response.data.data);
      setAcHeaterFormId(response.data.data._id)
    } catch (error) {
       console.log(error.message); 
    }
  }

  async function handleElectronicsSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,'instrumentClusterGaugesImage')
      const response=await axios.post("https://autofinder-backend.vercel.app/api/electronics/create",dataToSend)
      // console.log(response.data.data);
      setElectronicsFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleExteriorBodySubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"fogLightsWorking")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/exteriorBody/create",dataToSend)
      // console.log(response.data.data._id);
      setExteriorBodyFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleTyresSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"wheelCaps")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/tyres/create",dataToSend)
      // console.log(response.data.data);
      setTyresFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleTestDriveSubmit(e){
    e.preventDefault()
    try {
      const dataToSend=extractDataUpToKey(inspectionData,"testDriveDoneBy")
      const response=await axios.post("https://autofinder-backend.vercel.app/api/testDrive/create",dataToSend)
      // console.log(response.data.data);
      setTestDriveFormId(response.data.data._id)
    } catch (error) {
      console.log(error.message);  
    }
  }

  function handleTest(){
    console.log(carDetailsId);
    console.log(bodyFrameFormId,engineFormId,brakesFormId,suspensionFormId,interiorFormId,acHeaterFormId,electronicsFormId,exteriorBodyFormId,tyresFormId,testDriveFormId);
  }


  async function handleCarInspectionReport(e){
    e.preventDefault()
    try {
      console.log(carDetailsId)
      console.log(bodyFrameFormId)
      console.log(engineFormId)
      console.log(suspensionFormId)
      console.log(interiorFormId)
      console.log(acHeaterFormId)
      console.log(electronicsFormId)
      console.log(exteriorBodyFormId)
      console.log(tyresFormId)
      console.log(testDriveFormId)
      const response=await axios.post("https://autofinder-backend.vercel.app/api/carInspectionReport/create",{
        carDetailsId:carDetailsId,
        bodyFrameFormId:bodyFrameFormId,
        engineFormId: engineFormId,
        brakesFormId: brakesFormId,
        suspensionFormId: suspensionFormId,
        interiorFormId: interiorFormId,
        acHeaterFormId: acHeaterFormId,
        electronicsFormId: electronicsFormId,
        exteriorBodyFormId: exteriorBodyFormId,
        tyresFormId: tyresFormId,
        testDriveFormId: testDriveFormId,
      })
      console.log('Inspection Id: ',response.data.data._id);
      setCarInspectionReportId(response.data.data._id)

      const res = await axios.get(`https://autofinder-backend.vercel.app/api/carInspectionReport/${response.data.data._id}`, {
        responseType: 'blob'
      });
      const blob = res.data;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.log(error.message); 
    }
  }

  async function addCarInspectionReport(){
    try {
      const response=await axios.put("https://autofinder-backend.vercel.app/api/carAd/insertReport",{
        carDetailsId:carDetailsId,
        carInspectionId:carInspectionReportId
      }) 
      console.log(response.data.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  return ( 
    <div className="carInspectionReportAdd">
      <button onClick={handleTest}>Test</button>
        {/* <h1>Accident Form</h1> */}
      <form action="" onSubmit={handleSubmit} className="form">
      <h1 style={{ backgroundColor: 'red' }}>Body Frame</h1>
        <div className="formgrid">
            <div >
          <label htmlFor="accident">Radiator Core Support</label>
          <select id="accident" name="radiatorCoreSupport" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
          name="radiatorCoreSupportImages"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Right Strut Tower Apron</label>
          <select id="accident" name="rightStrutTowerApron" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="rightStrutTowerApronImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightStrutTowerApronImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Left Strut Tower Apron</label>
          <select id="accident" name="leftStrutTowerApron" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="leftStrutTowerApronImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img src={inspectionData.leftStrutTowerApronImages} alt="" />
        </div>

        <div>
          <label htmlFor="accident">Right Front Rail</label>
          <select id="accident" name="cowlPanelFirewall" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="rightFrontRailImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightFrontRailImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Left Front Rail</label>
          <select id="accident" name="leftFrontRail" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="leftFrontRailImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightFrontRailImages} alt="" /> */}
        </div>
        
        <div>
          <label htmlFor="accident">Cowl Panel Firewall</label>
          <select id="accident" name="rightFrontRail" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Right A Pillar</label>
          <select id="accident" name="rightAPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Left A Pillar</label>
          <select id="accident" name="leftAPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Right B Pillar</label>
          <select id="accident" name="rightBPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Left B Pillar</label>
          <select id="accident" name="leftBPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="accident">Right C Pillar</label>
          <select id="accident" name="rightCPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Left C Pillar</label>
          <select id="accident" name="leftCPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
        </div>

        <div>
          <label htmlFor="accident">Boot Floor</label>
          <select id="accident" name="bootFloor" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="bootFloorImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.bootFloorImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Boot Lock Pillar</label>
          <select id="accident" name="bootLockPillar" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="bootLockPillarImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightFrontRailImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Front Sub Frame</label>
          <select id="accident" name="frontSubFrame" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="frontSubFrameImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightFrontRailImages} alt="" /> */}
        </div>

        <div>
          <label htmlFor="accident">Rear Sub Frame</label>
          <select id="accident" name="rearSubFrame" defaultValue="Non-Accidented" onChange={(e) => changeHandler(e)}>
            <option value="Accidented">Accidented</option>
            <option value="Non-Accidented">Non-Accidented</option>
          </select>
          <input
            type="file"
            name="rearSubFrameImages"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={inspectionData.rightFrontRailImages} alt="" /> */}
        </div>
        </div>
      


        <button>Submit</button>
      </form>


      <form action="" onSubmit={handleEngineSubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Engine</h1>

        <div className="formgrid">
        <div >
          <label htmlFor="accident">Engine Oil Level</label>
          <select id="accident" name="engineOilLevel" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Black</option>
            <option value="Ok">Transparent</option>
          </select>
          <input
          name="engineOilLevelImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Engine Oil Leakage</label>
          <select id="accident" name="engineOilLeakage" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Leakage</option>
            <option value="Ok">No Leakage</option>
          </select>
          <input
          name="engineOilLeakageImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Transmission Oil Leakage</label>
          <select id="accident" name="transmissionOilLeakage" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Leakage</option>
            <option value="Ok">No Leakage</option>
          </select>
          <input
          name="transmissionOilLeakageImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Coolant Leakage</label>
          <select id="accident" name="coolantLeakage" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Leakage</option>
            <option value="Ok">No Leakage</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Brake Oil Leakage</label>
          <select id="accident" name="brakeOilLeakage" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Leakage</option>
            <option value="Ok">No Leakage</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Belts Fan</label>
          <select id="accident" name="beltsFan" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="beltsFanImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Wires Wiring Harness</label>
          <select id="accident" name="wiresWiringHarness" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="wiresWiringHarnessImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Engine Blow Manual Check</label>
          <select id="accident" name="engineBlowManualCheck" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Engine Noise</label>
          <select id="accident" name="engineNoise" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Noise</option>
            <option value="Ok">No Noise</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Engine Vibration</label>
          <select id="accident" name="engineVibration" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Vibration</option>
            <option value="Ok">No Vibration</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Cold Start</label>
          <select id="accident" name="coldStart" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Engine Mounts</label>
          <select id="accident" name="engineMounts" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Pulleys Adjuster</label>
          <select id="accident" name="pulleysAdjuster" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>
        
        <div >
          <label htmlFor="accident">Hoses</label>
          <select id="accident" name="hoses" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="hosesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Exhaust Sound</label>
          <select id="accident" name="exhaustSound" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Radiator</label>
          <select id="accident" name="radiator" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="radiatorImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.radiatorCoreSupportImages} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Suction Fan</label>
          <select id="accident" name="suctionFan" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Starter Operation</label>
          <select id="accident" name="starterOperation" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
        </div>
        </div>
        <button>Submit</button>
      </form>

      <form action=""onSubmit={handleBrakeSubmit} >
      <h1 style={{ backgroundColor: 'red' }}>Brakes</h1>

        <div className="formgrid">

        <div >
          <label htmlFor="accident">Front Right Disc</label>
          <select id="accident" name="frontRightDisc" defaultValue="Smooth" onChange={(e) => changeHandler(e)}>
            <option value="Rough">Rough</option>
            <option value="Smooth">Smooth</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Front Left Disc</label>
          <select id="accident" name="frontLeftDisc" defaultValue="Smooth" onChange={(e) => changeHandler(e)}>
            <option value="Rough">Rough</option>
            <option value="Smooth">Smooth</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Front Right Brake Pad</label>
          <select id="accident" name="frontRightBrakePad" defaultValue="More than 50%" onChange={(e) => changeHandler(e)}>
            <option value="Less than 50%">Less than 50%</option>
            <option value="More than 50%">More than 50%</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Front Left Brake Pad</label>
          <select id="accident" name="frontLeftBrakePad" defaultValue="More than 50%" onChange={(e) => changeHandler(e)}>
            <option value="Less than 50%">Less than 50%</option>
            <option value="More than 50%">More than 50%</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Hand Brake</label>
          <select id="accident" name="handBrake" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="handBrakeImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        </div>
        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleSuspensionSubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Suspension</h1>

        <div className="formgrid">

          <div >
            <label htmlFor="accident">Steering Wheel Play</label>
            <select id="accident" name="steeringWheelPlay" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
              <option value="Faulty">Faulty</option>
              <option value="Ok">Ok</option>
            </select>
          </div>

          <div >
          <label htmlFor="accident">Right Ball Joint</label>
          <select id="accident" name="rightBallJoint" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rightBallJointImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Left Ball Joint</label>
          <select id="accident" name="leftBallJoint" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="leftBallJointImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Right Z Links</label>
          <select id="accident" name="rightZLinks" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rightZLinksImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Left Z Links</label>
          <select id="accident" name="leftZLinks" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="leftZLinksImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Right Tie Rod End</label>
          <select id="accident" name="rightTieRodEnd" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rightTieRodEndImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>      

        <div >
          <label htmlFor="accident">Left Tie Rod End</label>
          <select id="accident" name="leftTieRodEnd" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="leftTieRodEndImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>      

        <div >
          <label htmlFor="accident">Front Right Boots</label>
          <select id="accident" name="frontRightBoots" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontRightBootsImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>      

        <div >
          <label htmlFor="accident">Front Left Boots</label>
          <select id="accident" name="frontLeftBoots" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontLeftBootsImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        <div >
          <label htmlFor="accident">Front Right Bushes</label>
          <select id="accident" name="frontRightBushes" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontRightBushesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>    

        <div >
          <label htmlFor="accident">Front Left Bushes</label>
          <select id="accident" name="frontLeftBushes" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontLeftBushesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>    

        <div >
          <label htmlFor="accident">Front Right Shock</label>
          <select id="accident" name="frontRightShock" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontRightShockImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>    

        <div >
          <label htmlFor="accident">Front Left Shock</label>
          <select id="accident" name="frontLeftShock" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontLeftShockImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        <div >
          <label htmlFor="accident">Rear Right Bushes</label>
          <select id="accident" name="rearRightBushes" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rearRightBushesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        <div >
          <label htmlFor="accident">Rear Left Bushes</label>
          <select id="accident" name="rearLeftBushes" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rearLeftBushesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        <div >
          <label htmlFor="accident">Rear Right Shock</label>
          <select id="accident" name="rearRightShock" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rearRightShockImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        <div >
          <label htmlFor="accident">Rear Left Shock</label>
          <select id="accident" name="rearLeftShock" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rearLeftShockImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>  

        </div>
        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleInteriorSubmit} >
      <h1 style={{ backgroundColor: 'red' }}>Interior</h1>

        <div className="formgrid">
       
        <div >
          <label htmlFor="accident">Steering Wheel Condition</label>
          <select id="accident" name="steeringWheelCondition" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="steeringWheelConditionImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Steering Wheel Buttons</label>
          <select id="accident" name="steeringWheelButtons" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>
         
        </div>

        <div >
          <label htmlFor="accident">Horn</label>
          <select id="accident" name="horn" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Lights Lever Switch</label>
          <select id="accident" name="lightsLeverSwitch" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Wiper Washer Lever</label>
          <select id="accident" name="wiperWasherLever" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Right Side Mirror</label>
          <select id="accident" name="rightSideMirror" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">left Side Mirror</label>
          <select id="accident" name="leftSideMirror" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Rear View Mirror Dimmer</label>
          <select id="accident" name="rearViewMirrorDimmer" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Right Seat Adjuster Recliner</label>
          <select id="accident" name="rightSeatAdjusterRecliner" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Left Seat Adjuster Recliner</label>
          <select id="accident" name="leftSeatAdjusterRecliner" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Right Seat Adjuster Lear Track</label>
          <select id="accident" name="rightSeatAdjusterLearTrack" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Left Seat Adjuster Lear Track</label>
          <select id="accident" name="leftSeatAdjusterLearTrack" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Right Seat Belt</label>
          <select id="accident" name="rightSeatBelt" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Left Seat Belt</label>
          <select id="accident" name="leftSeatBelt" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Rear Seat Belts</label>
          <select id="accident" name="rearSeatBelts" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Glove Box</label>
          <select id="accident" name="gloveBox" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Front Right Power Window</label>
          <select id="accident" name="frontRightPowerWindow" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Front Left Power Window</label>
          <select id="accident" name="frontLeftPowerWindow" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Rear Right Power Window</label>
          <select id="accident" name="rearRightPowerWindow" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Rear Left Power Window</label>
          <select id="accident" name="rearLeftPowerWindow" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Auto Lock Button</label>
          <select id="accident" name="autoLockButton" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

        <div >
          <label htmlFor="accident">Window Saftey Lock</label>
          <select id="accident" name="windowSafetyLock" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Not-Working">Not-Working</option>
            <option value="Working">Working</option>
          </select>         
        </div>

          <div>
              <label htmlFor="interiorLightings">Interior Lightings</label>
              <select id="interiorLightings" name="interiorLightings" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="AC">AC</label>
              <select id="AC" name="AC" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="defog">Defog</label>
              <select id="defog" name="defog" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="hazardLights">Hazard Lights</label>
              <select id="hazardLights" name="hazardLights" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="audioVideo">Audio Video</label>
              <select id="audioVideo" name="audioVideo" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="rearViewCamera">Rear View Camera</label>
              <select id="rearViewCamera" name="rearViewCamera" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="trunkReleaseLeverButton">Trunk Release Lever Button</label>
              <select id="trunkReleaseLeverButton" name="trunkReleaseLeverButton" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="fuelCapReleaseLeverButton">Fuel Cap Release Lever Button</label>
              <select id="fuelCapReleaseLeverButton" name="fuelCapReleaseLeverButton" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="bonnetReleaseLeverButton">Bonnet Release Lever Button</label>
              <select id="bonnetReleaseLeverButton" name="bonnetReleaseLeverButton" defaultValue="Working" onChange={(e) => changeHandler(e)}>
                <option value="Not-Working">Not-Working</option>
                <option value="Working">Working</option>
              </select>
            </div>

            <div>
              <label htmlFor="roof">Roof</label>
              <select id="roof" name="roof" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
                <option value="Damaged">Damaged</option>
                <option value="Not-Perfect">Not-Perfect</option>
                <option value="Perfect">Perfect</option>
              </select>
            </div>

            <div>
              <label htmlFor="floorMat">Floor Mat</label>
              <select id="floorMat" name="floorMat" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
                <option value="Damaged">Damaged</option>
                <option value="Not-Perfect">Not-Perfect</option>
                <option value="Perfect">Perfect</option>
              </select>
            </div>

            <div>
              <label htmlFor="frontRightSeatPoshish">Front Right Seat Poshish</label>
              <select id="frontRightSeatPoshish" name="frontRightSeatPoshish" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
                <option value="Damaged">Damaged</option>
                <option value="Not-Perfect">Not-Perfect</option>
                <option value="Perfect">Perfect</option>
              </select>
            </div>

            <div>
              <label htmlFor="frontLeftSeatPoshish">Front Left Seat Poshish</label>
              <select id="frontLeftSeatPoshish" name="frontLeftSeatPoshish" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
                <option value="Damaged">Damaged</option>
                <option value="Not-Perfect">Not-Perfect</option>
                <option value="Perfect">Perfect</option>
              </select>
            </div>

            <div>
              <label htmlFor="rearSeatPoshish">Rear Seat Poshish</label>
              <select id="rearSeatPoshish" name="rearSeatPoshish" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
                <option value="Damaged">Damaged</option>
                <option value="Not-Perfect">Not-Perfect</option>
                <option value="Perfect">Perfect</option>
              </select>
            </div>

        <div >
          <label htmlFor="accident">Dashboard Condition</label>
          <select id="accident" name="dashboardCondition" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="dashboardConditionImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Spare Tire</label>
          <select id="accident" name="spareTire" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="spareTireImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Tools</label>
          <select id="accident" name="tools" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="toolsImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Jack</label>
          <select id="accident" name="jack" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="jackImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        

        </div>

        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleAcHeaterSubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Ac/Heater</h1>

        <div className="formgrid">
        <div>
          <label htmlFor="acFitted">Ac Fitted</label>
          <select id="acFitted" name="acFitted" defaultValue="Yes" onChange={(e) => changeHandler(e)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor="acOperational">Ac Operational</label>
          <select id="acOperational" name="acOperational" defaultValue="Yes" onChange={(e) => changeHandler(e)}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor="blower">Blower</label>
          <select id="blower" name="blower" defaultValue="Excellent" onChange={(e) => changeHandler(e)}>
            <option value="Poor">Poor</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label htmlFor="cooling">Cooling</label>
          <select id="cooling" name="cooling" defaultValue="Excellent" onChange={(e) => changeHandler(e)}>
            <option value="Poor">Poor</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label htmlFor="heating">Heating</label>
          <select id="heating" name="heating" defaultValue="Excellent" onChange={(e) => changeHandler(e)}>
            <option value="Poor">Poor</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>          

        </div>
        <button>submit</button>
      </form>

      <form action="" onSubmit={handleElectronicsSubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Electronics</h1>

        <div className="formgrid">

        <div >
          <label htmlFor="accident">Computer Check Up</label>
          <select id="accident" name="computerCheckUp" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="computerCheckUpImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div>
          <label htmlFor="batteryWarningLight">Battery Warning Light</label>
          <select id="batteryWarningLight" name="batteryWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="oilPressureLowWarningLight">Oil Pressure Low Warning Light</label>
          <select id="oilPressureLowWarningLight" name="oilPressureLowWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="temperatureWarningLight">Temperature Warning Light</label>
          <select id="temperatureWarningLight" name="temperatureWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="airBagWarningLight">Air Bag Warning Light</label>
          <select id="airBagWarningLight" name="airBagWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="powerSteeringWarningLight">Power Steering Warning Light</label>
          <select id="powerSteeringWarningLight" name="powerSteeringWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="absWarningLight">ABS Warning Light</label>
          <select id="absWarningLight" name="absWarningLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="keyFobBatteryLowLight">Key Fob Battery Low Light</label>
          <select id="keyFobBatteryLowLight" name="keyFobBatteryLowLight" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div>
          <label htmlFor="batteryVoltage">Battery Voltage</label>
          <select id="batteryVoltage" name="batteryVoltage" defaultValue="12" onChange={(e) => changeHandler(e)}>
            <option value="12">12V</option>
            <option value="low">Low Voltage</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Terminals Condition</label>
          <select id="accident" name="terminalsCondition" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="terminalsConditionImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div>
          <label htmlFor="charging">Charging</label>
          <select id="charging" name="charging" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Not Ok">Not Ok</option>
            <option value="Ok">Ok</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Alternator Operation</label>
          <select id="accident" name="alternatorOperation" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="alternatorOperationImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.alternatorOperationImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Instrument Cluster Gauges</label>
          <select id="accident" name="instrumentClusterGauges" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="instrumentClusterGaugesImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBr} alt="" /> */}
        </div>

        </div>
        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleExteriorBodySubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Exterior Body</h1>

        <div className="formgrid">

        <div>
          <label htmlFor="batteryWarningLight">Trunk Lock</label>
          <select id="batteryWarningLight" name="trunkLock" defaultValue="Not Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        <div >
          <label htmlFor="accident">Front Windshield Condition</label>
          <select id="accident" name="frontWindshieldCondition" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="frontWindshieldConditionImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div >
          <label htmlFor="accident">Rear Windshield Condition</label>
          <select id="accident" name="rearWindshieldCondition" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Faulty">Faulty</option>
            <option value="Ok">Ok</option>
          </select>
          <input
          name="rearWindshieldConditionImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
          {/* <img src={inspectionData.handBrakeImage} alt="" /> */}
        </div>

        <div>
          <label htmlFor="frontRightDoorWindow">Front Right Door Window</label>
          <select id="frontRightDoorWindow" name="frontRightDoorWindow" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Ok">Ok</option>
            <option value="Not Ok">Not Ok</option>
          </select>
        </div>

        <div>
          <label htmlFor="frontLeftDoorWindow">Front Left Door Window</label>
          <select id="frontLeftDoorWindow" name="frontLeftDoorWindow" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Ok">Ok</option>
            <option value="Not Ok">Not Ok</option>
          </select>
        </div>

        <div>
          <label htmlFor="rearRightDoorWindow">Rear Right Door Window</label>
          <select id="rearRightDoorWindow" name="rearRightDoorWindow" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Ok">Ok</option>
            <option value="Not Ok">Not Ok</option>
          </select>
        </div>

        <div>
          <label htmlFor="rearLeftDoorWindow">Rear Left Door Window</label>
          <select id="rearLeftDoorWindow" name="rearLeftDoorWindow" defaultValue="Ok" onChange={(e) => changeHandler(e)}>
            <option value="Ok">Ok</option>
            <option value="Not Ok">Not Ok</option>
          </select>
        </div>

        <div>
          <label htmlFor="windscreenWiper">Windscreen Wiper</label>
          <select id="windscreenWiper" name="windscreenWiper" defaultValue="Cleaning Properly" onChange={(e) => changeHandler(e)}>
            <option value="Cleaning Properly">Cleaning Properly</option>
            <option value="Not Cleaning Properly">Not Cleaning Properly</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Right Headlight (Working)</label>
          <select id="rightHeadlightWorking" name="rightHeadlightWorking" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>

        <div>
          <label htmlFor="leftHeadlightWorking">Left Headlight (Working)</label>
          <select id="leftHeadlightWorking" name="leftHeadlightWorking" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightHeadlightCondition">Right Headlight (Condition)</label>
          <select id="rightHeadlightCondition" name="rightHeadlightCondition" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
            <option value="Perfect">Perfect</option>
            <option value="Not Perfect">Not Perfect</option>
          </select>
        </div>

        <div>
          <label htmlFor="leftHeadlightCondition">Left Headlight (Condition)</label>
          <select id="leftHeadlightCondition" name="leftHeadlightCondition" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
            <option value="Perfect">Perfect</option>
            <option value="Not Perfect">Not Perfect</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightTaillightWorking">Right Taillight (Working)</label>
          <select id="rightTaillightWorking" name="rightTaillightWorking" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>

        <div>
          <label htmlFor="leftTaillightWorking">Left Taillight (Working)</label>
          <select id="leftTaillightWorking" name="leftTaillightWorking" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightTaillightCondition">Right Taillight (Condition)</label>
          <select id="rightTaillightCondition" name="rightTaillightCondition" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
            <option value="Perfect">Perfect</option>
            <option value="Not Perfect">Not Perfect</option>
          </select>
        </div>

        <div>
          <label htmlFor="leftTaillightCondition">Left Taillight (Condition)</label>
          <select id="leftTaillightCondition" name="leftTaillightCondition" defaultValue="Perfect" onChange={(e) => changeHandler(e)}>
            <option value="Perfect">Perfect</option>
            <option value="Not Perfect">Not Perfect</option>
          </select>
        </div>

        <div>
          <label htmlFor="fogLightsWorking">Fog Lights (Working)</label>
          <select id="fogLightsWorking" name="fogLightsWorking" defaultValue="Working" onChange={(e) => changeHandler(e)}>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>


        </div>
        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleTyresSubmit}>
      <h1 style={{ backgroundColor: 'red' }}>Tyres</h1>

        <div className="formgrid">

        <div>
          <label htmlFor="rightHeadlightEurostar">Front Right Tyre Brand</label>
          <select id="rightHeadlightEurostar" name="frontRightTyreBrand" defaultValue="Eurostar" onChange={(e) => changeHandler(e)}>
            <option value="Eurostar">Eurostar</option>
            <option value="Some Other">Some Other</option>
          </select>
          <input
          name="frontRightTyreImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
        </div>

       


        <div>
          <label htmlFor="rightHeadlightWorking">Front Left Tyre Brand</label>
          <select id="rightHeadlightWorking" name="frontLeftTyreBrand" defaultValue="Eurostar" onChange={(e) => changeHandler(e)}>
            <option value="Eurostar">Eurostar</option>
            <option value="Some Other">Some Other</option>
          </select>
          <input
          name="frontLeftTyreImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Rear Right Tyre Brand</label>
          <select id="rightHeadlightWorking" name="rearRightTyreBrand" defaultValue="Eurostar" onChange={(e) => changeHandler(e)}>
            <option value="Eurostar">Eurostar</option>
            <option value="Some Other">Some Other</option>
          </select>
          <input
          name="rearRightTyreImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Rear Left Tyre Brand</label>
          <select id="rightHeadlightWorking" name="rearLeftTyreBrand" defaultValue="Eurostar" onChange={(e) => changeHandler(e)}>
            <option value="Eurostar">Eurostar</option>
            <option value="Some Other">Some Other</option>
          </select>
          <input
          name="rearLeftTyreImage"
            type="file"
            accept="image/*"
            onChange={(e)=>handleImageChange(e)}
          />
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Tyre Size</label>
          <select id="rightHeadlightWorking" name="tyreSize" defaultValue="175/65/R15" onChange={(e) => changeHandler(e)}>
            <option value="175/65/R15">175/65/R15</option>
            <option value="175/65/R16">175/65/R16</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Rims</label>
          <select id="rightHeadlightWorking" name="rims" defaultValue="Alloy" onChange={(e) => changeHandler(e)}>
            <option value="Alloy">Alloy</option>
            <option value="Metal">Metal</option>
          </select>
        </div>

        <div>
          <label htmlFor="rightHeadlightWorking">Wheel Caps</label>
          <select id="rightHeadlightWorking" name="wheelCaps" defaultValue="Present" onChange={(e) => changeHandler(e)}>
            <option value="Present">Present</option>
            <option value="Not Present">Not Present</option>
          </select>
        </div>

        </div>
        <button>Submit</button>
      </form>

      <form action="" onSubmit={handleTestDriveSubmit}>
        <h1 style={{ backgroundColor: 'red' }}>Test Drive</h1>

        
        <div className="formgrid">
        <div>
        <label htmlFor="enginePick">Engine Pick</label>
        <select
          id="enginePick"
          name="enginePick"
          defaultValue="Ok"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Ok">Ok</option>
          <option value="Faulty">Faulty</option>
          
        </select>
      </div>

      <div>
        <label htmlFor="driveShaftNoise">Drive Shaft Noise</label>
        <select
          id="driveShaftNoise"
          name="driveShaftNoise"
          defaultValue="No Noise"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="No Noise">No Noise</option>
          <option value="Noisy">Noisy</option>

        </select>
      </div>

      <div>
        <label htmlFor="gearShiftingAutomatic">Gear Shifting (Automatic)</label>
        <select
          id="gearShiftingAutomatic"
          name="gearShiftingAutomatic"
          defaultValue="Smooth"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Smooth">Smooth</option>
          <option value="Rough">Rough</option>
        </select>
      </div>

      <div>
        <label htmlFor="brakePedalOperation">Brake Pedal Operation</label>
        <select
          id="brakePedalOperation"
          name="brakePedalOperation"
          defaultValue="Timely Response"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Timely Response">Timely Response</option>
          <option value="Delay">Delay</option>
          
        </select>
      </div>

      <div>
        <label htmlFor="absOperation">ABS Operation</label>
        <select
          id="absOperation"
          name="absOperation"
          defaultValue="Timely Response"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Timely Response">Timely Response</option>
          <option value="Delay">Delay</option>
          
        </select>
      </div>

      <div>
        <label htmlFor="frontSuspension">Front Suspension (While Driving)</label>
        <select
          id="frontSuspension"
          name="frontSuspension"
          defaultValue="No Noise"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="No Noise">No Noise</option>
          <option value="Noise">Noise</option>
          {/* Add other options if needed */}
        </select>
      </div>

      <div>
        <label htmlFor="rearSuspension">Rear Suspension (While Driving)</label>
        <select
          id="rearSuspension"
          name="rearSuspension"
          defaultValue="No Noise"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="No Noise">No Noise</option>
          <option value="Noise">Noise</option>
          {/* Add other options if needed */}
        </select>
      </div>

      <div>
        <label htmlFor="steeringOperation">Steering Operation (While Driving)</label>
        <select
          id="steeringOperation"
          name="steeringOperation"
          defaultValue="Smooth"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Smooth">Smooth</option>
          <option value="Rough">Rough</option>
          
        </select>
      </div>

      <div>
        <label htmlFor="steeringWheelAlignment">Steering Wheel Alignment (While Driving)</label>
        <select
          id="steeringWheelAlignment"
          name="steeringWheelAlignment"
          defaultValue="Centered"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Centered">Centered</option>
          <option value="Off-Centered">Off-Centered</option>
          
        </select>
      </div>

      <div>
        <label htmlFor="acOperation">AC Operation (While Driving)</label>
        <select
          id="acOperation"
          name="acOperation"
          defaultValue="Perfect"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Perfect">Perfect</option>
          <option value="Not Ok">Not Ok</option>

        </select>
      </div>

      <div>
        <label htmlFor="heaterOperation">Heater Operation (While Driving)</label>
        <select
          id="heaterOperation"
          name="heaterOperation"
          defaultValue="Perfect"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Perfect">Perfect</option>
          <option value="Not Ok">Not Ok</option>

        </select>
      </div>

      <div>
        <label htmlFor="speedometer">Speedometer (While Driving)</label>
        <select
          id="speedometer"
          name="speedometer"
          defaultValue="Working"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Working">Working</option>
          <option value="Broken">Broken</option>

        </select>
      </div>

      <div>
        <label htmlFor="testDriveDoneBy">Test Drive Done By</label>
        <select
          id="testDriveDoneBy"
          name="testDriveDoneBy"
          defaultValue="Technician"
          onChange={(e)=>changeHandler(e)}
        >
          <option value="Technician">Technician</option>
          <option value="Technician">Seller</option>
          
        </select>
      </div>


        </div>
        <button>Submit</button>
      </form>

      <button onClick={handleCarInspectionReport}>Add Inspection Report</button>
      <button onClick={addCarInspectionReport}>Attach Report to Car Ad</button>

      
    </div>
  );
}

export default CarInspectionReportAdd;
