import React from "react";

import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../shared/components/formElements/ImageUpload";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import Button from "../shared/components/formElements/Button";
import Card from "../shared/components/UIElements/Card";
import { TestSteps } from "../assets/svgs/svgs";
import "./test.css";

const Test = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const result = (sign, meaning, similarImages) => {
    return { sign, meaning, similarImages };
  };
  let responseData;

  const imageSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/test",
        "POST",
        formData
      );
      result(
        responseData.sign,
        responseData.meaning,
        responseData.similarImages
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="main-test_page">
        <h1>How to use the app</h1>
        <div className="steps">
          <TestSteps />
        </div>
        <div className="app-usage">
          <p style={{ fontSize: "12px" }}>
            First click the <small> Upload </small> button or drag and drop the
            image to upload it.
          </p>
          <p style={{ fontSize: "12px" }}>
            Then click the <small> Predict sign </small> button to allow the app
            to analyse the provided image and return the appropriately matching
            road sign.
          </p>
          <p style={{ fontSize: "12px" }}>
            Finally, you will see the result (the predicted road sign. You can
            repeat the process for more road signs discovery.
          </p>
        </div>
        <Card
          style={{
            width: "60%",
            boder: "1px solid #ccc",
            padding: "0 0 1rem 1rem",
          }}
        >
          <form className="test-form" onSubmit={imageSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <ImageUpload
              id="image"
              onInput={inputHandler}
              errorText="Please upload an image"
            />
            <Button blueBg type="submit" disabled={!formState.isValid}>
              Predict Sign
            </Button>
          </form>
          {responseData && (
            <div className="results">
              <h1>Prediction Result:</h1>
              <p>
                <span>Predicted traffic road sign: </span>{" "}
                <b>{responseData.sign}</b>
              </p>
              <p>{responseData.meaning}</p>
              <p>
                <span>Similar images:</span>
              </p>
              <div>
                {responseData.images.map((image) => (
                  <img
                    src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
                    alt={responseData.sign}
                  />
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Test;
