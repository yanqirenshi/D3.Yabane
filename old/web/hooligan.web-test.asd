#|
  This file is a part of hooligan.web project.
|#

(defsystem "hooligan.web-test"
  :defsystem-depends-on ("prove-asdf")
  :author ""
  :license ""
  :depends-on ("hooligan.web"
               "prove")
  :components ((:module "tests"
                :components
                ((:test-file "hooligan.web"))))
  :description "Test system for hooligan.web"

  :perform (test-op (op c) (symbol-call :prove-asdf :run-test-system c)))
