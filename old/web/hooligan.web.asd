#|
  This file is a part of hooligan.web project.
|#
(defsystem "hooligan.web"
  :version "0.1.0"
  :author ""
  :license ""
  :depends-on ()
  :components ((:module "src"
                :components
                ((:module "controller"
                  :components ((:file "package")
                               (:file "session")
                               (:file "file")))
                 (:file "package")
                 (:file "render")
                 (:file "router"))))
  :description ""
  :long-description
  #.(read-file-string
     (subpathname *load-pathname* "README.markdown"))
  :in-order-to ((test-op (test-op "hooligan.web-test"))))
