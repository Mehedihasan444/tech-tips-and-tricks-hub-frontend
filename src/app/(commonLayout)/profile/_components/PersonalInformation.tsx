
"use client";
import React, { useState } from "react";
import {
  Github,
  Globe,
  Linkedin,
  Twitter,
  Plus,
  X,
  PenBoxIcon,
} from "lucide-react";
import Link from "next/link";
import { IUser } from "@/types/IUser";

type IEducation = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
};

type IMedia = {
  platform: string;
  url: string;
};

const PersonalInformation = ({ user }: { user: IUser }) => {
  const [editMode, setEditMode] = useState(false);

  // Manage form state for personal information
  const [formData, setFormData] = useState({
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    maritalStatus: user?.maritalStatus || "",
    education: user?.education || [],
    socialMedia: user?.socialMedia || [],
  });

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Add new education entry
  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", startDate: "", endDate: "", gpa: "" },
      ],
    });
  };

  // Add new social media entry
  const handleAddSocialMedia = () => {
    setFormData({
      ...formData,
      socialMedia: [...formData.socialMedia, { platform: "", url: "" }],
    });
  };

  // Update education entry
  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEducation = formData.education.map((edu, idx) =>
      idx === index ? { ...edu, [field]: value } : edu
    );
    setFormData({ ...formData, education: updatedEducation });
  };

  // Update social media entry
  const handleSocialMediaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSocialMedia = formData.socialMedia.map((media, idx) =>
      idx === index ? { ...media, [field]: value } : media
    );
    setFormData({ ...formData, socialMedia: updatedSocialMedia });
  };

  const handleSave = () => {
    // Simulate save functionality, which can be extended with an API call
    console.log("Saving updated user data:", formData);
    setEditMode(false);
  };

  return (
    <div className="bg-default-50 shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between ">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        {/* Toggle edit mode */}
        <button
          onClick={() => setEditMode(!editMode)}
          className="mb-4 text-sm text-default-500 underline"
        >
          {editMode ? <X /> : <PenBoxIcon />}
        </button>
      </div>

      {/* Personal Info Form */}
      {editMode ? (
        <>
          <div className="mb-2">
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold">Phone:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.mobileNumber}
              onChange={(e) => handleChange(e, "mobileNumber")}
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold">Date of Birth:</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange(e, "dateOfBirth")}
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold">Gender:</label>
            <select
              className="select select-bordered w-full"
              value={formData.gender}
              onChange={(e) => handleChange(e, "gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="font-semibold">Marital Status:</label>
            <select
              className="select select-bordered w-full"
              value={formData.maritalStatus}
              onChange={(e) => handleChange(e, "maritalStatus")}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Education Section */}
          <div className="mb-4">
            <strong>Education:</strong>
            {formData.education && formData.education.length > 0 ? (
              <ul className="list-disc list-none list-inside">
                {formData.education.map((edu: IEducation, index: number) => (
                  <li key={index} className="mb-2">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                      className="input input-bordered w-full mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      className="input input-bordered w-full mb-2"
                    />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="input input-bordered w-full"
                      />
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="input input-bordered w-full"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="GPA"
                      value={edu.gpa}
                      onChange={(e) =>
                        handleEducationChange(index, "gpa", e.target.value)
                      }
                      className="input input-bordered w-full mt-2"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No education information available.</p>
            )}
            <button
              onClick={handleAddEducation}
              className="text-sm text-blue-500 underline flex items-center mt-2"
            >
              <Plus className="mr-1" /> Add Education
            </button>
          </div>

          {/* Social Media Section */}
          <div>
            <strong>Social Media:</strong>
            <ul className="list-none space-y-1 list-inside mt-2">
              {formData.socialMedia.map((media: IMedia, index: number) => (
                <li key={index} className="mb-2">
                  <select
                    className="select select-bordered w-full mb-2"
                    value={media.platform}
                    onChange={(e) =>
                      handleSocialMediaChange(index, "platform", e.target.value)
                    }
                  >
                    <option value="github">Github</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="portfolio">Portfolio</option>
                  </select>
                  <input
                    type="url"
                    placeholder="URL"
                    value={media.url}
                    onChange={(e) =>
                      handleSocialMediaChange(index, "url", e.target.value)
                    }
                    className="input input-bordered w-full"
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddSocialMedia}
              className="text-sm text-blue-500 underline flex items-center mt-2"
            >
              <Plus className="mr-1" /> Add Social Media
            </button>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {formData.mobileNumber}
          </p>
          <p className="mb-2">
            <strong>Date of Birth:</strong> {formData.dateOfBirth}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {formData.gender}
          </p>
          <p className="mb-2">
            <strong>Marital Status:</strong> {formData.maritalStatus}
          </p>

          {/* Education Section */}
          <div className="mb-4">
            <strong>Education:</strong>
            {formData.education && formData.education.length > 0 ? (
              <ul className="list-disc list-inside">
                {formData.education.map((edu: IEducation, index: number) => (
                  <li key={index}>
                    {edu.institution} - {edu.degree} ({edu.startDate} -{" "}
                    {edu.endDate}), GPA: {edu.gpa}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No education information available.</p>
            )}
          </div>

          {/* Social Media Section */}
          <div>
            <strong>Social Media:</strong>
            <ul className="list-none space-y-1 list-inside mt-2">
              {formData.socialMedia && formData.socialMedia.length > 0 ? (
                formData.socialMedia.map((media: IMedia, index: number) => {
                  let IconComponent;
                  switch (media.platform) {
                    case "github":
                      IconComponent = Github;
                      break;
                    case "linkedin":
                      IconComponent = Linkedin;
                      break;
                    case "twitter":
                      IconComponent = Twitter;
                      break;
                    case "portfolio":
                      IconComponent = Globe;
                      break;
                    default:
                      IconComponent = null;
                  }

                  return (
                    <li key={index} className="flex gap-2 items-center">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      )}
                      <Link
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary"
                      >
                        {media.platform.charAt(0).toUpperCase() +
                          media.platform.slice(1)}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <p>No social media information available.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;
