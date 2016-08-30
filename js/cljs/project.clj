(defproject cljs "0.1.0"
    :description "cljs for bakehard wp theme"
    
    :dependencies [ [org.clojure/clojure "1.8.0"]
                    [org.clojure/clojurescript "1.9.216" :scope "provided"]]
    
    :plugins [[lein-cljsbuild "1.1.1"]]

    :cljsbuild
    {:builds {:min
        {:source-paths ["src/cljs"]
        :compiler
            {:output-to "js/cljs.js"
            :output-dir "js"
            :optimizations :advanced
            :pretty-print  false}}
        }
    }
)

