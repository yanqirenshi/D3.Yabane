(in-package :cl-user)
(defpackage hooligan.web.render
  (:use :cl)
  (:import-from #:caveman2
                #:*response*
                #:response-headers)
  (:export #:render
           #:render-json
           #:render-html
           #:render-js))
(in-package :hooligan.web.render)

(defun render-json (object)
  (setf (getf (response-headers *response*) :content-type) "application/json")
  (jonathan:to-json object))

(defun render-html (contents)
  (setf (getf (response-headers *response*) :content-type) "text/html")
  contents)

(defun render-js (contents)
  (setf (getf (response-headers *response*) :content-type) "application/javascript")
  contents)
