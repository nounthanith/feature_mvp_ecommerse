import React, { useEffect } from 'react';

export default function Dialog({
    open,
    title,
    description,
    children,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    onClose,
    disableConfirm = false,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-md mx-4 rounded-lg bg-white shadow-lg">
                {title ? (
                    <div className="px-5 pt-5">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        {description ? (
                            <p className="mt-1 text-sm text-gray-500">{description}</p>
                        ) : null}
                    </div>
                ) : null}

                {children ? <div className="px-5 pt-4">{children}</div> : null}

                <div className="flex items-center justify-end gap-3 px-5 py-4">
                    <button
                        type="button"
                        onClick={onCancel ?? onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        disabled={disableConfirm}
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-md text-white transition-colors ${disableConfirm ? 'bg-rose-300 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
