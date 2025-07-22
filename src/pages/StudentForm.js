import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentAPI from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchStudent();
    }
  }, [id, isEditMode]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getStudent(id);
      const student = response.data;
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        address: student.address,
        course: student.course,
        enrollmentDate: new Date(student.enrollmentDate).toISOString().split('T')[0]
      });
    } catch (error) {
      toast.error('Failed to fetch student details');
      navigate('/students');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      setSubmitting(true);
      
      if (isEditMode) {
        await studentAPI.updateStudent(id, formData);
        toast.success('Student updated successfully');
      } else {
        await studentAPI.createStudent(formData);
        toast.success('Student created successfully');
      }
      
      navigate('/students');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditMode ? 'Edit Student' : 'Add New Student'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter student's full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Course Field */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course *
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.course ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics Engineering">Electronics Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
            {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
          </div>

          {/* Enrollment Date Field */}
          <div>
            <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Date *
            </label>
            <input
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.enrollmentDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.enrollmentDate && <p className="mt-1 text-sm text-red-600">{errors.enrollmentDate}</p>}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter complete address"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                submitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {submitting ? 'Saving...' : (isEditMode ? 'Update Student' : 'Create Student')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;