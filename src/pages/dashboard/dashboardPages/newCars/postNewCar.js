import { useState, useEffect } from "react";
import "./newCars.css";
import axios from "axios";
import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CarModelPicker from "../../../../components/carModelPicker/carModelPicker";

const PostNewCar = () => {
  // --- Picture ---
  const [images, setImages] = useState([]);
  const [pictures, setPictures] = useState([]); // State to store selected pictures
  const handlePictureChange = (fileList) => {
    setPictures(fileList);
  };

  useEffect(() => {
    setTimeout(() => {
      setImages(pictures.map((picture) => picture.originFileObj));
    }, 1000);
  }, [pictures]);
  // --- Picture ---

  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    keySpecifications: {
      price: "",
      bodyType: "",
      dimensions: "",
      groundClearance: "",
      horsePower: "",
      bootSpace: "",
      fuelType: "",
      batteryCapacity: "",
      chargingTime: "",
      topSpeed: "",
      range: "",
      transmission: "",
      kerbWeight: "",
      seatingCapacity: "",
      tyreSize: "",
    },
    specifications: {
      dimensions: {
        overallLength: "",
        overallWidth: "",
        overallHeight: "",
        wheelBase: "",
        groundClearance: "",
        kerbWeight: "",
        bootSpace: "",
        seatingCapacity: "",
        noOfDoors: "",
      },
      engineMotor: {
        engineType: "",
        batteryType: "",
        batteryCapacity: "",
        range: "",
        maxSpeed: "",
        power: "",
      },
      transmission: {
        transmissionType: "",
        gearbox: "",
      },
      steering: {
        steeringType: "",
        powerAssisted: "",
        minimumTurningRadius: "",
      },
      suspensionBrakes: {
        frontSuspension: "",
        rearSuspension: "",
        frontBrakes: "",
        rearBrakes: "",
      },
      wheelsTyres: {
        wheelType: "",
        wheelSize: "",
        tyreSize: "",
        spareTyre: "",
        pcd: "",
      },
    },
    features: {
      safety: {
        noOfAirbags: "",
        noOfSeatbelts: "",
        driverSeatBeltWarning: false,
        passengerSeatBeltWarning: false,
        doorAjarWarning: false,
        adjustableSeats: false,
        vehicleStabilityControl: false,
        tractionControl: false,
        hillStartAssistControl: false,
        hillDescentControl: false,
        childSafetyLock: false,
        speedSensingAutoDoorLock: false,
        antiLockBrakingSystem: false,
        brakeAssist: false,
        electronicBrakeForceDistribution: false,
        brakeOverrideSystem: false,
      },
      exterior: {
        alloyWheels: false,
        coloredOutsideDoorHandles: false,
        bodyColoredBumpers: false,
        sunRoof: false,
        moonRoof: false,
        fogLamps: false,
        roofRail: false,
        sideSteps: false,
        adjustableHeadlights: false,
        daytimeRunningLights: false,
        headlightWasher: false,
        xenonHeadlamps: false,
        rearSpoiler: false,
        rearWiper: false,
      },
      instrumentation: {
        tachometer: false,
        informationCluster: "",
      },
      infotainment: {
        cdPlayer: false,
        dvdPlayer: false,
        numberOfSpeakers: "",
        frontSpeakers: false,
        rearSpeakers: false,
        bluetoothConnectivity: false,
        usbAndAuxiliaryCable: false,
        rearSeatEntertainment: false,
        androidAuto: false,
        appleCarPlay: false,
        touchscreen: "",
      },
      comfortConvenience: {
        airConditioner: false,
        climateControl: false,
        airPurifier: false,
        rearAcVents: false,
        rearHeater: false,
        heatedSeats: false,
        frontSeatVentilation: false,
        rearSeatVentilation: false,
        remoteControlledBoot: false,
        navigationSystem: false,
        keylessEntry: false,
        pushButtonStart: false,
        centralLocking: false,
        cruiseControl: false,
        parkingSensors: false,
        parkingCamera: false,
        autoRainSensingWipers: false,
        autoHeadlamps: false,
        powerWindows: false,
        powerSteering: false,
        powerDoorLocks: false,
        powerFoldingMirrors: false,
        rearWiper: false,
        rearDefogger: false,
        followMeHomeHeadlamps: false,
        headlampBeamAdjuster: false,
      },
    },
  });

  ////////////////////////////////

  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const setYearFn = (value) => {
    setYear(value);
  };
  const setBrandFn = (value) => {
    setBrand(value);
  };
  const setModelFn = (value) => {
    setModel(value);
  };
  const setVariantFn = (value) => {
    setVariant(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    let tempCar = { ...car };

    if (keys.length === 1) {
      tempCar[keys[0]] = value;
    } else if (keys.length === 2) {
      tempCar[keys[0]][keys[1]] = value;
    } else if (keys.length === 3) {
      tempCar[keys[0]][keys[1]][keys[2]] = value;
    }

    setCar(tempCar);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const keys = name.split(".");
    let tempCar = { ...car };

    if (keys.length === 2) {
      tempCar[keys[0]][keys[1]] = checked;
    } else if (keys.length === 3) {
      tempCar[keys[0]][keys[1]][keys[2]] = checked;
    }

    setCar(tempCar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];

    const findEmptyFields = (obj, path = "") => {
      for (let key in obj) {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          findEmptyFields(obj[key], newPath);
        } else if (obj[key] === "") {
          emptyFields.push(newPath);
        }
      }
    };

    findEmptyFields(car);

    if (emptyFields.length > 0) {
      alert(
        `Please fill out the following fields: \n${emptyFields.join("\n")}`
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://autofinder-backend.vercel.app/api/newCar/add",
        car
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }

    console.log(car);
  };

  return (
    <div className="PostNewCar">
      <div className="FormDiv">
        <form>
          {/* <form onSubmit={handleSubmit}> */}
          {/* <CarModelPicker
            setYearPropFn={setYearFn}
            setBrandPropFn={setBrandFn}
            setModelPropFn={setModelFn}
            setVariantPropFn={setVariantFn}
          /> */}
          <br />
          <br />
          <br />
          <br />
          <div className="formFirstDiv padding-10">
            <Form.Item
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload
                listType="picture-card"
                fileList={pictures}
                onChange={({ fileList }) => handlePictureChange(fileList)}
              >
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
          </div>
          <div>
            <label>Make:</label>
            <input
              type="text"
              name="make"
              value={car.make}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Model:</label>
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={handleChange}
              required
            />
          </div>
          <h1>KEY SPECIFICATIONS</h1>
          <div className="formGroupDiv">
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="keySpecifications.price"
                value={car.keySpecifications.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Body Type:</label>
              <input
                type="text"
                name="keySpecifications.bodyType"
                value={car.keySpecifications.bodyType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Dimensions:</label>
              <input
                type="text"
                name="keySpecifications.dimensions"
                value={car.keySpecifications.dimensions}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ground Clearance:</label>
              <input
                type="text"
                name="keySpecifications.groundClearance"
                value={car.keySpecifications.groundClearance}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Horsepower:</label>
              <input
                type="text"
                name="keySpecifications.horsePower"
                value={car.keySpecifications.horsePower}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Boot Space:</label>
              <input
                type="text"
                name="keySpecifications.bootSpace"
                value={car.keySpecifications.bootSpace}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Fuel Type:</label>
              <input
                type="text"
                name="keySpecifications.fuelType"
                value={car.keySpecifications.fuelType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Battery Capacity:</label>
              <input
                type="text"
                name="keySpecifications.batteryCapacity"
                value={car.keySpecifications.batteryCapacity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Charging Time:</label>
              <input
                type="text"
                name="keySpecifications.chargingTime"
                value={car.keySpecifications.chargingTime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Top Speed:</label>
              <input
                type="text"
                name="keySpecifications.topSpeed"
                value={car.keySpecifications.topSpeed}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Range:</label>
              <input
                type="text"
                name="keySpecifications.range"
                value={car.keySpecifications.range}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Transmission:</label>
              <input
                type="text"
                name="keySpecifications.transmission"
                value={car.keySpecifications.transmission}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Kerb Weight:</label>
              <input
                type="text"
                name="keySpecifications.kerbWeight"
                value={car.keySpecifications.kerbWeight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Seating Capacity:</label>
              <input
                type="text"
                name="keySpecifications.seatingCapacity"
                value={car.keySpecifications.seatingCapacity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Tyre Size:</label>
              <input
                type="text"
                name="keySpecifications.tyreSize"
                value={car.keySpecifications.tyreSize}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h1>Specifications</h1>
          <h3>Dimensions</h3>
          <div className="formGroupDiv">
            <div>
              <label>Overall Length:</label>
              <input
                type="text"
                name="specifications.dimensions.overallLength"
                value={car.specifications.dimensions.overallLength}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Overall Width:</label>
              <input
                type="text"
                name="specifications.dimensions.overallWidth"
                value={car.specifications.dimensions.overallWidth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Overall Height:</label>
              <input
                type="text"
                name="specifications.dimensions.overallHeight"
                value={car.specifications.dimensions.overallHeight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Wheel Base:</label>
              <input
                type="text"
                name="specifications.dimensions.wheelBase"
                value={car.specifications.dimensions.wheelBase}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ground Clearance:</label>
              <input
                type="text"
                name="specifications.dimensions.groundClearance"
                value={car.specifications.dimensions.groundClearance}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Kerb Weight:</label>
              <input
                type="text"
                name="specifications.dimensions.kerbWeight"
                value={car.specifications.dimensions.kerbWeight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Boot Space:</label>
              <input
                type="text"
                name="specifications.dimensions.bootSpace"
                value={car.specifications.dimensions.bootSpace}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Seating Capacity:</label>
              <input
                type="text"
                name="specifications.dimensions.seatingCapacity"
                value={car.specifications.dimensions.seatingCapacity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Number of Doors:</label>
              <input
                type="text"
                name="specifications.dimensions.noOfDoors"
                value={car.specifications.dimensions.noOfDoors}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3>Engine Motor</h3>
          <div className="formGroupDiv">
            <div>
              <label>Engine Type:</label>
              <input
                type="text"
                name="specifications.engineMotor.engineType"
                value={car.specifications.engineMotor.engineType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Battery Type:</label>
              <input
                type="text"
                name="specifications.engineMotor.batteryType"
                value={car.specifications.engineMotor.batteryType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Battery Capacity:</label>
              <input
                type="text"
                name="specifications.engineMotor.batteryCapacity"
                value={car.specifications.engineMotor.batteryCapacity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Range:</label>
              <input
                type="text"
                name="specifications.engineMotor.range"
                value={car.specifications.engineMotor.range}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Max Speed:</label>
              <input
                type="text"
                name="specifications.engineMotor.maxSpeed"
                value={car.specifications.engineMotor.maxSpeed}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Power:</label>
              <input
                type="text"
                name="specifications.engineMotor.power"
                value={car.specifications.engineMotor.power}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3>Transmission</h3>
          <div className="formGroupDiv">
            <div>
              <label>Transmission Type:</label>
              <input
                type="text"
                name="specifications.transmission.transmissionType"
                value={car.specifications.transmission.transmissionType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Gearbox:</label>
              <input
                type="text"
                name="specifications.transmission.gearbox"
                value={car.specifications.transmission.gearbox}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3>Steering</h3>
          <div className="formGroupDiv">
            <div>
              <label>Steering Type:</label>
              <input
                type="text"
                name="specifications.steering.steeringType"
                value={car.specifications.steering.steeringType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Power Assisted:</label>
              <input
                type="text"
                name="specifications.steering.powerAssisted"
                value={car.specifications.steering.powerAssisted}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Minimum Turning Radius:</label>
              <input
                type="text"
                name="specifications.steering.minimumTurningRadius"
                value={car.specifications.steering.minimumTurningRadius}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3>Suspension Brakes</h3>
          <div className="formGroupDiv">
            <div>
              <label>Front Suspension:</label>
              <input
                type="text"
                name="specifications.suspensionBrakes.frontSuspension"
                value={car.specifications.suspensionBrakes.frontSuspension}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Rear Suspension:</label>
              <input
                type="text"
                name="specifications.suspensionBrakes.rearSuspension"
                value={car.specifications.suspensionBrakes.rearSuspension}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Front Brakes:</label>
              <input
                type="text"
                name="specifications.suspensionBrakes.frontBrakes"
                value={car.specifications.suspensionBrakes.frontBrakes}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Rear Brakes:</label>
              <input
                type="text"
                name="specifications.suspensionBrakes.rearBrakes"
                value={car.specifications.suspensionBrakes.rearBrakes}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h3>Wheel Tyres</h3>
          <div className="formGroupDiv">
            <div>
              <label>Wheel Type:</label>
              <input
                type="text"
                name="specifications.wheelsTyres.wheelType"
                value={car.specifications.wheelsTyres.wheelType}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Wheel Size:</label>
              <input
                type="text"
                name="specifications.wheelsTyres.wheelSize"
                value={car.specifications.wheelsTyres.wheelSize}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Tyre Size:</label>
              <input
                type="text"
                name="specifications.wheelsTyres.tyreSize"
                value={car.specifications.wheelsTyres.tyreSize}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Spare Tyre:</label>
              <input
                type="text"
                name="specifications.wheelsTyres.spareTyre"
                value={car.specifications.wheelsTyres.spareTyre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>PCD:</label>
              <input
                type="text"
                name="specifications.wheelsTyres.pcd"
                value={car.specifications.wheelsTyres.pcd}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <h1>Features</h1>
          <h3>Safety</h3>
          <div className="formGroupDiv">
            <div>
              <label>Number of Airbags:</label>
              <input
                type="number"
                name="features.safety.noOfAirbags"
                value={car.features.safety.noOfAirbags}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Number of Seatbelts:</label>
              <input
                type="number"
                name="features.safety.noOfSeatbelts"
                value={car.features.safety.noOfSeatbelts}
                onChange={handleChange}
                required
              />
            </div>
            <section className="checkboxHolder">
              <div>
                <label>Driver Seat Belt Warning:</label>
                <input
                  type="checkbox"
                  name="features.safety.driverSeatBeltWarning"
                  checked={car.features.safety.driverSeatBeltWarning}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Passenger Seat Belt Warning:</label>
                <input
                  type="checkbox"
                  name="features.safety.passengerSeatBeltWarning"
                  checked={car.features.safety.passengerSeatBeltWarning}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Door Ajar Warning:</label>
                <input
                  type="checkbox"
                  name="features.safety.doorAjarWarning"
                  checked={car.features.safety.doorAjarWarning}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Adjustable Seats:</label>
                <input
                  type="checkbox"
                  name="features.safety.adjustableSeats"
                  checked={car.features.safety.adjustableSeats}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Vehicle Stability Control:</label>
                <input
                  type="checkbox"
                  name="features.safety.vehicleStabilityControl"
                  checked={car.features.safety.vehicleStabilityControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Traction Control:</label>
                <input
                  type="checkbox"
                  name="features.safety.tractionControl"
                  checked={car.features.safety.tractionControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Hill Start Assist Control:</label>
                <input
                  type="checkbox"
                  name="features.safety.hillStartAssistControl"
                  checked={car.features.safety.hillStartAssistControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Hill Descent Control:</label>
                <input
                  type="checkbox"
                  name="features.safety.hillDescentControl"
                  checked={car.features.safety.hillDescentControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Child Safety Lock:</label>
                <input
                  type="checkbox"
                  name="features.safety.childSafetyLock"
                  checked={car.features.safety.childSafetyLock}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Speed Sensing Auto Door Lock:</label>
                <input
                  type="checkbox"
                  name="features.safety.speedSensingAutoDoorLock"
                  checked={car.features.safety.speedSensingAutoDoorLock}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Anti-lock Braking System (ABS):</label>
                <input
                  type="checkbox"
                  name="features.safety.antiLockBrakingSystem"
                  checked={car.features.safety.antiLockBrakingSystem}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Brake Assist:</label>
                <input
                  type="checkbox"
                  name="features.safety.brakeAssist"
                  checked={car.features.safety.brakeAssist}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Electronic Brake-force Distribution (EBD):</label>
                <input
                  type="checkbox"
                  name="features.safety.electronicBrakeForceDistribution"
                  checked={car.features.safety.electronicBrakeForceDistribution}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Brake Override System:</label>
                <input
                  type="checkbox"
                  name="features.safety.brakeOverrideSystem"
                  checked={car.features.safety.brakeOverrideSystem}
                  onChange={handleCheckboxChange}
                />
              </div>
            </section>
          </div>
          <h3>Exterior</h3>
          <div className="formGroupDiv">
            <section className="checkboxHolder">
              <div>
                <label>Alloy Wheels:</label>
                <input
                  type="checkbox"
                  name="features.exterior.alloyWheels"
                  checked={car.features.exterior.alloyWheels}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Colored Outside Door Handles:</label>
                <input
                  type="checkbox"
                  name="features.exterior.coloredOutsideDoorHandles"
                  checked={car.features.exterior.coloredOutsideDoorHandles}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Body Colored Bumpers:</label>
                <input
                  type="checkbox"
                  name="features.exterior.bodyColoredBumpers"
                  checked={car.features.exterior.bodyColoredBumpers}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Sun Roof:</label>
                <input
                  type="checkbox"
                  name="features.exterior.sunRoof"
                  checked={car.features.exterior.sunRoof}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Moon Roof:</label>
                <input
                  type="checkbox"
                  name="features.exterior.moonRoof"
                  checked={car.features.exterior.moonRoof}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Fog Lamps:</label>
                <input
                  type="checkbox"
                  name="features.exterior.fogLamps"
                  checked={car.features.exterior.fogLamps}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Roof Rail:</label>
                <input
                  type="checkbox"
                  name="features.exterior.roofRail"
                  checked={car.features.exterior.roofRail}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Side Steps:</label>
                <input
                  type="checkbox"
                  name="features.exterior.sideSteps"
                  checked={car.features.exterior.sideSteps}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Adjustable Headlights:</label>
                <input
                  type="checkbox"
                  name="features.exterior.adjustableHeadlights"
                  checked={car.features.exterior.adjustableHeadlights}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Daytime Running Lights:</label>
                <input
                  type="checkbox"
                  name="features.exterior.daytimeRunningLights"
                  checked={car.features.exterior.daytimeRunningLights}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Headlight Washer:</label>
                <input
                  type="checkbox"
                  name="features.exterior.headlightWasher"
                  checked={car.features.exterior.headlightWasher}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Xenon Headlamps:</label>
                <input
                  type="checkbox"
                  name="features.exterior.xenonHeadlamps"
                  checked={car.features.exterior.xenonHeadlamps}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Spoiler:</label>
                <input
                  type="checkbox"
                  name="features.exterior.rearSpoiler"
                  checked={car.features.exterior.rearSpoiler}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Wiper:</label>
                <input
                  type="checkbox"
                  name="features.exterior.rearWiper"
                  checked={car.features.exterior.rearWiper}
                  onChange={handleCheckboxChange}
                />
              </div>
            </section>
          </div>
          <h3>Instrumentation</h3>
          <div className="formGroupDiv">
            <div>
              <label>Information Cluster:</label>
              <input
                type="text"
                name="features.instrumentation.informationCluster"
                value={car.features.instrumentation.informationCluster}
                onChange={handleChange}
              />
            </div>
            <section className="checkboxHolder">
              <div>
                <label>Tachometer:</label>
                <input
                  type="checkbox"
                  name="features.instrumentation.tachometer"
                  checked={car.features.instrumentation.tachometer}
                  onChange={handleCheckboxChange}
                />
              </div>
            </section>
          </div>
          <h3>Infotaintment</h3>
          <div className="formGroupDiv">
            <div>
              <label>Number of Speakers:</label>
              <input
                type="text"
                name="features.infotainment.numberOfSpeakers"
                value={car.features.infotainment.numberOfSpeakers}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Touchscreen:</label>
              <input
                type="text"
                name="features.infotainment.touchscreen"
                value={car.features.infotainment.touchscreen}
                onChange={handleChange}
              />
            </div>
            <section className="checkboxHolder">
              <div>
                <label>CD Player:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.cdPlayer"
                  checked={car.features.infotainment.cdPlayer}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>DVD Player:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.dvdPlayer"
                  checked={car.features.infotainment.dvdPlayer}
                  onChange={handleCheckboxChange}
                />
              </div>

              <div>
                <label>Front Speakers:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.frontSpeakers"
                  checked={car.features.infotainment.frontSpeakers}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Speakers:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.rearSpeakers"
                  checked={car.features.infotainment.rearSpeakers}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Bluetooth Connectivity:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.bluetoothConnectivity"
                  checked={car.features.infotainment.bluetoothConnectivity}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>USB and Auxiliary Cable:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.usbAndAuxiliaryCable"
                  checked={car.features.infotainment.usbAndAuxiliaryCable}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Seat Entertainment:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.rearSeatEntertainment"
                  checked={car.features.infotainment.rearSeatEntertainment}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Android Auto:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.androidAuto"
                  checked={car.features.infotainment.androidAuto}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Apple CarPlay:</label>
                <input
                  type="checkbox"
                  name="features.infotainment.appleCarPlay"
                  checked={car.features.infotainment.appleCarPlay}
                  onChange={handleCheckboxChange}
                />
              </div>
            </section>
          </div>
          <h3>Comfort Convenience</h3>
          <div className="formGroupDiv">
            <section className="checkboxHolder">
              <div>
                <label>Air Conditioner:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.airConditioner"
                  checked={car.features.comfortConvenience.airConditioner}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Climate Control:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.climateControl"
                  checked={car.features.comfortConvenience.climateControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Air Purifier:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.airPurifier"
                  checked={car.features.comfortConvenience.airPurifier}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear AC Vents:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.rearAcVents"
                  checked={car.features.comfortConvenience.rearAcVents}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Heater:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.rearHeater"
                  checked={car.features.comfortConvenience.rearHeater}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Heated Seats:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.heatedSeats"
                  checked={car.features.comfortConvenience.heatedSeats}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Front Seat Ventilation:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.frontSeatVentilation"
                  checked={car.features.comfortConvenience.frontSeatVentilation}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Seat Ventilation:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.rearSeatVentilation"
                  checked={car.features.comfortConvenience.rearSeatVentilation}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Remote Controlled Boot:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.remoteControlledBoot"
                  checked={car.features.comfortConvenience.remoteControlledBoot}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Navigation System:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.navigationSystem"
                  checked={car.features.comfortConvenience.navigationSystem}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Keyless Entry:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.keylessEntry"
                  checked={car.features.comfortConvenience.keylessEntry}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Push Button Start:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.pushButtonStart"
                  checked={car.features.comfortConvenience.pushButtonStart}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Central Locking:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.centralLocking"
                  checked={car.features.comfortConvenience.centralLocking}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Cruise Control:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.cruiseControl"
                  checked={car.features.comfortConvenience.cruiseControl}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Parking Sensors:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.parkingSensors"
                  checked={car.features.comfortConvenience.parkingSensors}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Parking Camera:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.parkingCamera"
                  checked={car.features.comfortConvenience.parkingCamera}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Auto Rain Sensing Wipers:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.autoRainSensingWipers"
                  checked={
                    car.features.comfortConvenience.autoRainSensingWipers
                  }
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Auto Headlamps:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.autoHeadlamps"
                  checked={car.features.comfortConvenience.autoHeadlamps}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Power Windows:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.powerWindows"
                  checked={car.features.comfortConvenience.powerWindows}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Power Steering:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.powerSteering"
                  checked={car.features.comfortConvenience.powerSteering}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Power Door Locks:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.powerDoorLocks"
                  checked={car.features.comfortConvenience.powerDoorLocks}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Power Folding Mirrors:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.powerFoldingMirrors"
                  checked={car.features.comfortConvenience.powerFoldingMirrors}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Wiper:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.rearWiper"
                  checked={car.features.comfortConvenience.rearWiper}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Rear Defogger:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.rearDefogger"
                  checked={car.features.comfortConvenience.rearDefogger}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Follow Me Home Headlamps:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.followMeHomeHeadlamps"
                  checked={
                    car.features.comfortConvenience.followMeHomeHeadlamps
                  }
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label>Headlamp Beam Adjuster:</label>
                <input
                  type="checkbox"
                  name="features.comfortConvenience.headlampBeamAdjuster"
                  checked={car.features.comfortConvenience.headlampBeamAdjuster}
                  onChange={handleCheckboxChange}
                />
              </div>
            </section>
          </div>
          {/* =============== FORM BUTTON ======== */}
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewCar;
