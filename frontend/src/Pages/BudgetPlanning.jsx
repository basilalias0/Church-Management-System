// frontend/src/pages/BudgetPlanning.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getuserToken } from '../Utiles/storageHandler';
import { BASE_URL } from '../Utiles/Url';


getuserToken
BASE_URL
const BudgetPlanning = () => {
    const [budgets, setBudgets] = useState([]);
    const [formData, setFormData] = useState({
        type: 'income',
        description: '',
        amount: '',
        dateOfPlanning: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // API endpoint for budget planning
    const API_ENDPOINT = `${BASE_URL}/budget-planning`;

    // Get token from sessionStorage using your utility function
    const token = getuserToken();

    // Configure headers with the token
    const config = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_ENDPOINT, config);
            console.log('Fetch Budgets Response:', response.data);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response ? error.response.data : null,
                status: error.response ? error.response.status : null
            });
            setError(error.response?.data?.message || error.message || 'Failed to fetch budgets. Please check if the backend server is running and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await axios.put(`${API_ENDPOINT}/${editingId}`, formData, config);
            } else {
                await axios.post(API_ENDPOINT, formData, config);
            }
            fetchBudgets();
            resetForm();
        } catch (error) {
            console.error('Error submitting budget:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response ? error.response.data : null,
                status: error.response ? error.response.status : null
            });
            setError(error.response?.data?.message || error.message || 'Failed to submit budget. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            await axios.delete(`${API_ENDPOINT}/${id}`, config);
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response ? error.response.data : null,
                status: error.response ? error.response.status : null
            });
            setError(error.response?.data?.message || error.message || 'Failed to delete budget. Please try again.');
        }
    };

    const handleEdit = (budget) => {
        setEditingId(budget._id);
        setFormData({
            type: budget.type,
            description: budget.description,
            amount: budget.amount,
            dateOfPlanning: budget.dateOfPlanning.split('T')[0]
        });
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            type: 'income',
            description: '',
            amount: '',
            dateOfPlanning: ''
        });
    };

    return (
        <div style={{
            backgroundColor: '#F3F4F6', // bg-gray-100
            minHeight: '100vh',
            padding: '24px'
        }}>
            <div style={{
                maxWidth: '1280px', // max-w-5xl
                margin: '0 auto',
                backgroundColor: '#FFFFFF', // bg-white
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{
                    fontSize: '1.875rem', // text-3xl
                    fontWeight: 'bold',
                    color: '#1E3A8A', // text-blue-900
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>
                    Church Budget Planning
                </h2>

                {error && (
                    <div style={{
                        color: '#DC2626', // text-red-600
                        textAlign: 'center',
                        marginBottom: '16px',
                        padding: '10px',
                        border: '1px solid #DC2626',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <form 
                    onSubmit={handleSubmit}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid
                        gap: '16px', // gap-4
                        marginBottom: '24px'
                    }}
                >
                    <select 
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        style={{
                            padding: '12px', // p-3
                            border: '1px solid #D1D5DB', // border
                            borderRadius: '4px', // rounded
                            width: '100%',
                            outline: 'none',
                            transition: 'all 0.2s',
                            ':focus': {
                                borderColor: '#3B82F6', // focus:ring-blue-500
                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                            }
                        }}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    
                    <input
                        type="text"
                        placeholder="Description (e.g., Donation, Rent)"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        style={{
                            padding: '12px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            width: '100%',
                            outline: 'none',
                            transition: 'all 0.2s',
                            ':focus': {
                                borderColor: '#3B82F6',
                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                            }
                        }}
                    />
                    
                    <input
                        type="number"
                        placeholder="Amount ($)"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        required
                        style={{
                            padding: '12px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            width: '100%',
                            outline: 'none',
                            transition: 'all 0.2s',
                            ':focus': {
                                borderColor: '#3B82F6',
                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                            }
                        }}
                    />
                    
                    <input
                        type="date"
                        value={formData.dateOfPlanning}
                        onChange={(e) => setFormData({...formData, dateOfPlanning: e.target.value})}
                        required
                        style={{
                            padding: '12px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '4px',
                            width: '100%',
                            outline: 'none',
                            transition: 'all 0.2s',
                            ':focus': {
                                borderColor: '#3B82F6',
                                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                            }
                        }}
                    />
                    
                    <div style={{
                        display: 'flex',
                        gap: '16px', // gap-4
                        gridColumn: 'span 1 / span 2', // md:col-span-2
                        flexWrap: 'wrap'
                    }}>
                        <button 
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '8px 24px', // px-6 py-2
                                backgroundColor: loading ? '#D1D5DB' : '#16A34A', // bg-green-600
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                                width: '100%',
                                maxWidth: '200px'
                            }}
                            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#15803D')} // hover:bg-green-700
                            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#16A34A')}
                        >
                            {editingId ? 'Update' : 'Add'} Budget
                        </button>
                        
                        {editingId && (
                            <button 
                                type="button" 
                                onClick={resetForm}
                                style={{
                                    padding: '8px 24px',
                                    backgroundColor: '#9CA3AF', // bg-gray-400
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    width: '100%',
                                    maxWidth: '200px'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#6B7280'} // hover:bg-gray-500
                                onMouseOut={(e) => e.target.style.backgroundColor = '#9CA3AF'}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#4B5563', // text-gray-600
                        marginTop: '24px'
                    }}>
                        Loading budgets...
                    </div>
                ) : (
                    <div style={{
                        marginTop: '24px'
                    }}>
                        <h2 style={{
                            fontSize: '1.25rem', // text-xl
                            fontWeight: '600', // font-semibold
                            color: '#1E3A8A', // text-blue-800
                            marginBottom: '8px',
                            textAlign: 'center'
                        }}>
                            Detailed Budget Records
                        </h2>

                        {budgets.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // md:grid-cols-2
                                gap: '16px' // gap-4
                            }}>
                                {budgets.map(budget => (
                                    <div 
                                        key={budget._id}
                                        style={{
                                            padding: '16px', // p-4
                                            borderRadius: '8px', // rounded-lg
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // shadow-md
                                            backgroundColor: budget.type === 'income' ? '#ECFDF5' : '#FEF2F2', // bg-green-50 or bg-red-50
                                            borderLeft: `4px solid ${budget.type === 'income' ? '#10B981' : '#EF4444'}`, // border-l-4 border-green-500 or border-red-500
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <p style={{
                                            color: '#4B5563', // text-gray-600
                                            fontSize: '0.875rem' // text-sm
                                        }}>
                                            {new Date(budget.dateOfPlanning).toLocaleDateString()}
                                        </p>
                                        <h3 style={{
                                            fontSize: '1.125rem', // text-lg
                                            fontWeight: 'bold',
                                            color: budget.type === 'income' ? '#065F46' : '#991B1B', // text-green-800 or text-red-800
                                            marginTop: '4px'
                                        }}>
                                            {budget.type}: {budget.description}
                                        </h3>
                                        <p style={{
                                            fontWeight: '600', // font-semibold
                                            marginTop: '8px',
                                            fontSize: '1.125rem',
                                            color: budget.type === 'income' ? '#16A34A' : '#DC2626' // text-green-600 or text-red-600
                                        }}>
                                            ${budget.amount.toFixed(2)}
                                        </p>
                                        <p style={{
                                            marginTop: '8px',
                                            color: '#374151', // text-gray-700
                                            fontStyle: 'italic'
                                        }}>
                                            {budget.type === 'income'
                                                ? `This amount was received as income for ${budget.description} on ${new Date(budget.dateOfPlanning).toLocaleDateString()}. This could be from donations, fundraising, or offerings.`
                                                : `This expense was recorded for ${budget.description} on ${new Date(budget.dateOfPlanning).toLocaleDateString()}. This could include utility bills, rent, _

System: or other church-related costs.`}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            gap: '8px',
                                            marginTop: '8px'
                                        }}>
                                            <button 
                                                onClick={() => handleEdit(budget)}
                                                disabled={loading}
                                                style={{
                                                    padding: '4px 16px', // px-4 py-1
                                                    backgroundColor: loading ? '#D1D5DB' : '#2563EB', // bg-blue-600
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: loading ? 'not-allowed' : 'pointer',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1D4ED8')} // hover:bg-blue-700
                                                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563EB')}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(budget._id)}
                                                disabled={loading}
                                                style={{
                                                    padding: '4px 16px',
                                                    backgroundColor: loading ? '#D1D5DB' : '#EF4444', // bg-red-500
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: loading ? 'not-allowed' : 'pointer',
                                                    transition: 'background-color 0.2s'
                                                }}
                                                onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#DC2626')} // hover:bg-red-600
                                                onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#EF4444')}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{
                                color: '#4B5563', // text-gray-600
                                textAlign: 'center',
                                marginTop: '16px'
                            }}>
                                No budget items added yet.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetPlanning;