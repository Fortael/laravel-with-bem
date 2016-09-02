# laravel-with-bem

Все это описание,чтобы самому не забыть. На свой страх и риск...не используйте вообще никогда. 

Папка **views** из **resources** перенесена в `public/views`, чтобы был доступ к собранным js и css файлам.

Сборка на лету разворачивает все `@extend`, `@include`, `@stack` и т.д в html. ([laravel-blade-parser](https://github.com/pbelyaev/laravel-blade-parser)).
Из html определяется декларация зависимостей. ([html2bemjson](https://github.com/bem-contrib/html2bemjson))

Это значит, что можно использовать `enb server` для отладки js и css.

# Сборка

Для сборки прочих assets есть еще 1 уровень:


    // "/public/assets/*"
    enb make -d public

В файле `public/.bem/nodeps.js` указаны зависимости, которые будут исключены  из сборка. По умолчанию исключен `i-bem__dom_init_auto`.

Все бандлы на основном уровне исключают пересечение зависимостей с бандлом `/public/assets/bootstrap/boostrap.tmp.deps.js`. В сборку не попадают такие вещи, как, например, *i-bem*, *jquery* и т.д Таким образом к странице подключаются 2 отдельных файла: с фреймворком и блоками. Сделано это, чтобы закэшировать основной код в браузер и не повторять его.

**Обязательно!** В первую очередь собрать assets бандл. 

