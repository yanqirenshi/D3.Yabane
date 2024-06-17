(in-package :cl-user)
(defpackage hooligan.web.router
  (:use #:cl
        #:caveman2
        #:lack.middleware.validation
        #:hooligan.web.render
        #:hooligan.controller)
  (:export #:*router*))
(in-package :hooligan.web.router)


;;;;;
;;;;; Variables
;;;;;
(defvar *redirect-url-success-sign-in* nil)

;;;;;
;;;;; Router
;;;;;
(defclass <router> (<app>) ())
(defvar *router* (make-instance '<router>))
(clear-routing-rules *router*)


;;;;;
;;;;; Auth
;;;;;
(defmacro with-session (&body body)
  `(progn
    (unless (get-session)
      (caveman2:redirect "/galapagos/"))
    ,@body))


;;;;;
;;;;; Routing rules
;;;;;
(defroute "/" ()
  (with-session
    (render-html (get-file-contents "index.html"))))

(defroute "/*.js" (&key splat)
  (with-session
    (let ((file-name (concatenate 'string (car splat) ".js")))
      (render-js (get-file-contents file-name)))))

(defroute "/js/*.js" (&key splat)
  (with-session
    (let ((file-name (concatenate 'string (car splat) ".js")))
      (render-js (get-file-contents file-name)))))


;;;;;
;;;;; Error pages
;;;;;
(defmethod on-exception ((app <router>) (code (eql 404)))
  (declare (ignore app))
  "404")
