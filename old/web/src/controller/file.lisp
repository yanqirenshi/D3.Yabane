(in-package :glpgs-hooligan.controller)

(defvar *front-root-directory*
  (merge-pathnames "../front/" (asdf:system-source-directory :glpgs-hooligan.web)))

(defun make-file-path (path)
  (merge-pathnames path *front-root-directory*))

(defvar *file-cache* (make-hash-table :test 'equal))

(defun file2str (file-path)
  (with-open-file (s file-path)
    (let ((new-line (make-string 1 :initial-element #\Newline)))
      (do ((line (read-line s) (read-line s nil 'eof))
           (out nil))
          ((eq line 'eof) out)
        (setf out
              (concatenate 'string out new-line line))))))

(defun add-cache (file-path)
  (let ((contents (file2str file-path)))
    (setf (gethash file-path *file-cache*) contents)))

(defun get-file-contents (path)
  (let* ((file-path (make-file-path path))
         (contents (gethash file-path *file-cache*)))
    (or contents
        (add-cache file-path))))
