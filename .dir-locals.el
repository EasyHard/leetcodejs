((js2-mode . (
              (compile-command . "DEBUG=1 node")
              (eval . (progn
                        (defun find-file-func ()
                          (when (eq 0 (buffer-size))
                            (insert-buffer-substring "javascript-template.js"))
                          (setq-local compile-command (format "DEBUG=1 node %s" (buffer-name)))
                          (local-set-key (kbd "<f9>") 'compile)
                          )
                        (add-hook 'find-file-hook 'find-file-func)
                        )))))
