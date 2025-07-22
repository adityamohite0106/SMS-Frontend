import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  DocumentArrowDownIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  CalendarIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import studentAPI from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteModal from '../components/DeleteModal';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getStudent(id);
      setStudent(response.data);
    } catch (error) {
      toast.error('Failed to fetch student details');
      navigate('/students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await studentAPI.deleteStudent(id);
      toast.success('Student deleted successfully');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to delete student');
      console.error('Error deleting student:', error);
    }
  };

  const downloadAdmissionForm = async () => {
    try {
      setDownloadingPDF(true);
      const response = await studentAPI.generateAdmissionForm(id);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admission-form-${student.studentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Admission form downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate admission form');
      console.error('Error generating PDF:', error);
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Student not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/students')}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={downloadAdmissionForm}
            disabled={downloadingPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            <span>{downloadingPDF ? 'Generating...' : 'Download Form'}</span>
          </button>
          
          <Link
            to={`/students/edit/${student._id}`}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
            <span>Edit</span>
          </Link>
          
          <button
            onClick={() => setDeleteModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Student Information Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-blue-100">Student ID: {student.studentId}</p>
              <p className="text-blue-100">{student.course}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h3>
              
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Academic Information
              </h3>
              
              <div className="flex items-center space-x-3">
                <IdentificationIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Student ID</p>
                  <p className="font-medium">{student.studentId}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <AcademicCapIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{student.course}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-medium">
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Created At</p>
                  <p className="font-medium">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        show={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        studentName={student.name}
      />
    </div>
  );
};

export default StudentDetail;
