(in-package :glpgs-hooligan.controller)

(defvar *session-key-name*
  "ghost.session")

(defun get-session-key ()
  (let ((cookie (request-cookies *request*)))
    (cdr (assoc *session-key-name* cookie :test 'string=))))

(defun save-session (ghost)
  (let ((session-key (get-session-key))
        (session *session*))
    (setf (gethash session-key session) (up:%id ghost))))

(defun get-session ()
  (let ((session-key (get-session-key))
        (session *session*))
    (gethash session-key session)))

(defun remove-session ()
  (let ((session-key (get-session-key))
        (session *session*))
    (remhash session-key session)))
