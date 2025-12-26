import React, { useEffect } from 'react';

export default function Dialog({
    open,
    title,
    description,
    children,
    confirmText = 'Confirm_Action',
    cancelText = 'Close',
    onConfirm,
    onCancel,
    onClose,
    disableConfirm = false,
    hideActions = false,
}) {
    useEffect(() => {
        const onKeyDown = (e) => {
            if (!open) return;
            if (e.key === 'Escape') {
                onClose?.();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop with heavy blur */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Dialog Box: Sharp corners and heavy industrial border */}
            <div className="relative w-full max-w-md bg-white border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">

                {title ? (
                    <div className="px-6 pt-6 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-rose-600"></div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black">
                                {title}
                            </h3>
                        </div>
                        {description ? (
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                {description}
                            </p>
                        ) : null}
                    </div>
                ) : null}

                {/* Main Content Area */}
                {children ? (
                    <div className="px-6 py-4 text-[11px] font-medium text-gray-800">
                        {children}
                    </div>
                ) : null}

                {/* Industrial Action Buttons */}
                {hideActions ? null : (
                    <div className="grid grid-cols-2 border-t-2 border-black mt-4">
                        <button
                            type="button"
                            onClick={onCancel ?? onClose}
                            className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 border-r-2 border-black transition-all active:bg-gray-100"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            disabled={disableConfirm}
                            onClick={onConfirm}
                            className={`px-4 py-4 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${disableConfirm
                                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-rose-600'
                                }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}