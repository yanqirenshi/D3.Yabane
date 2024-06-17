(defpackage glpgs-hooligan.controller
  (:nicknames glpgs-hooligan.ctlr)
  (:use :cl)
  (:import-from :caveman2
                #:throw-code
                #:request-cookies
                #:*request*
                #:*session*)
  (:export #:get-session)
  (:export #:get-file-contents))
(in-package :glpgs-hooligan.controller)
