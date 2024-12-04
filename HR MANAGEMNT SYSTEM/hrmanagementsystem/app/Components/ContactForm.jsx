'use client';
import React, { useState } from 'react';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        mobile: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.name.trim()===""|| formData.subject.trim()===""|| formData.mobile.trim()===""||formData.email.trim()===""||formData.message.trim()===""){
            alert("Please enter all the required fields")
        }
        else{

       

        try {
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                setFormData({ name: '', subject: '', mobile: '', email: '', message: '' });
            } else {
                alert('Failed to send the message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again.');
        }
    }
    };

    return (
        <>
            <button
                className="Equirebtn rounded-md p-1 w-36 bg-purple-700 text-white"
                onClick={() => document.getElementById('my_modal_4').showModal()}
            >
                Send Message
            </button>

            <dialog id="my_modal_4" className="modal overflow-auto">
                <div className="bg-zinc-50 overflow-auto w-full h-full">
                    <div className="absolute inline w-full md:pt-5 md:p-32 sm:p-10 p-10 h-fit overflow-auto bg-zinc-50 justify-center">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                            <h1 className="text-blue-700 text-2xl">CONTACT CUI HR</h1>
                            <p>
                                We value your inquiries! Please use the form below to reach out to the
                                CUI HR team. Once you submit your message, we will get back to you promptly.
                            </p>
                            <div className="flex flex-wrap mt-3 gap-x-8 gap-y-2 p-4 overflow-auto">
                                <div>
                                    <label className="font-bold text-sm">Name</label>
                                    <br />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-zinc-300 p-2 md:w-96 sm:max-w-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-sm">Subject</label>
                                    <br />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-zinc-300 p-2 md:w-96 sm:max-w-sm"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-sm">Mobile Contact</label>
                                    <br />
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="bg-zinc-300 p-2 md:w-96 sm:max-w-sm"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-sm">Email</label>
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-zinc-300 p-2 md:w-96 sm:max-w-sm"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-sm">Message</label>
                                    <br />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered textarea-lg"
                                        placeholder="Type the detail message here"
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        className="w-40 p-2 float-right rounded-sm mt-2 bg-blue-700 text-white"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Form;
