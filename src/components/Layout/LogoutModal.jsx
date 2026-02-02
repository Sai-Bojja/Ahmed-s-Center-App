import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-backdrop" onClick={onClose}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass modal-content"
                        style={{ maxWidth: '400px', textAlign: 'center' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '1px solid var(--accent)'
                        }}>
                            <LogOut color="var(--accent)" size={30} />
                        </div>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800' }}>Confirm Logout</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Are you sure you want to logout from Ahmed's Center?
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button
                                onClick={onClose}
                                className="btn btn-secondary"
                                style={{ justifyContent: 'center' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="btn btn-primary"
                                style={{ background: 'linear-gradient(135deg, var(--accent), #b91c1c)', boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)', justifyContent: 'center' }}
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LogoutModal;
