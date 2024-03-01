import './App.css';
import contractABI from "./abi.json"
import React from 'react';
import {Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ethers = require('ethers');


function App() {
    const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";


    async function requestAccount() {
        await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
    }

    async function updateOwnerAddress(ownerAddress) {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract =
                new ethers.Contract(contractAddress, contractABI, await signer);
            try {
                const transaction = await contract.updateOwner(ownerAddress);
                await transaction.wait();
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }

    async function updateOwnerName(ownerName) {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract =
                new ethers.Contract(contractAddress, contractABI, await signer);
            try {
                const transaction = await contract.updateOwnerName(ownerName);
                await transaction.wait();
            } catch (err) {
                console.error('Error:', err);
            }
        }
    }


    async function getOwnerDetails() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);

            try {
                document.getElementById("display").textContent = await contract.getOwnerDetails();
                toast.success("Information retrieved")
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }


    const handleAddressSubmit = async (values, {setSubmitting, resetForm}) => {
        if (values.Message !== null && values.Message !== "") {
            await updateOwnerAddress(values.Message);
            resetForm();
            await setSubmitting(true);
            toast.success("Address Saved")
        } else {
               toast.error("Empty Address!")
        }
    };
    const handleNameSubmit = async (values, {setSubmitting, resetForm}) => {
        if (values.Message !== null && values.Message !== "") {
            await updateOwnerName(values.Message);
            resetForm();
            await setSubmitting(true);
            toast.success("Name Saved")
        } else {
            toast.error("Empty Name")
        }

    };


    return (
        <div className="App">
            <header className="App-header">
                <h2>Information</h2>
                <div id={"whole"}>
                    <div className={"inputs"}>
                        <section className="form">
                            <Formik initialValues={{Message: ''}} onSubmit={handleAddressSubmit}>
                                {({
                                      values,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className={"name"}
                                                type="text"
                                                name="Message"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Message}
                                                placeholder="Type owner address here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                                            >
                                                {isSubmitting ? 'Saving Address...' : 'Input Address'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <Formik initialValues={{Message: ''}} onSubmit={handleNameSubmit}>
                                {({
                                      values,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className={"name"}
                                                type="text"
                                                name="Message"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Message}
                                                placeholder="Type owner name here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                                            >
                                                {isSubmitting ? 'Saving Name...' : 'Input Name'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </section>
                    </div>
                    <hr/>
                    <div>
                        <button id="but" onClick={() => getOwnerDetails()}>
                            Get Information
                        </button>
                        <h1 id="display"></h1>
                    </div>
                </div>
            </header>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;