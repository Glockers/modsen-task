'use strict';

module.exports = {
  // Добавим описание на русском языке ко всем типам
  types: [
    { value: 'feat', name: 'feat:      Добавление нового функционала' },
    { value: 'update', name: 'update:    Обновление функционала' },
    {
      value: 'refactor',
      name: 'refactor:  Правки кода без исправления ошибок или добавления новых функций'
    },
    { value: 'fix', name: 'fix:       Исправление ошибок' },
    { value: 'config', name: 'config:    Обновление конфигурации' },
    {
      value: 'style',
      name: 'style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)'
    },
    { value: 'revert', name: 'revert:    Откат на предыдущие коммиты' },
    { value: 'docs', name: 'docs:      Обновление документации' },
    {
      value: 'build',
      name: 'build:     Сборка проекта или изменения внешних зависимостей'
    },
    {
      value: 'perf',
      name: 'perf:      Изменения направленные на улучшение производительности'
    },
    { value: 'test', name: 'test:      Добавление тестов' }
  ],

  // Область. Она характеризует фрагмент кода, которую затронули изменения
  scopes: [{ name: 'auth' }, { name: 'modules' }, { name: 'common' }, { name: 'project' }, { name: 'config' }, { name: 'service' }, { name: 'controller' }, { name: 'repository' }, { name: 'middleware' }],

  // Поменяем дефолтные вопросы
  messages: {
    type: 'Какие изменения вы вносите?',
    scope: '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
    // Спросим если allowCustomScopes в true
    customScope: 'Укажите свою ОБЛАСТЬ:',
    subject: 'Напишите КОРОТКОЕ описание в ПОВЕЛИТЕЛЬНОМ наклонении:\n',
    body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
    breaking: 'Список BREAKING CHANGES (опционально):\n',
    footer:
      'Место для мета данных (тикетов, ссылок и остального). Например: SECRETMRKT-700, SECRETMRKT-800:\n',
    confirmCommit: 'Вас устраивает получившийся коммит?'
  },

  // Разрешим собственную ОБЛАСТЬ
  allowCustomScopes: true,

  // Запрет на Breaking Changes
  allowBreakingChanges: false,

  // // Префикс для нижнего колонтитула
  // footerPrefix: 'МЕТА ДАННЫЕ:',

  // limit subject length
  subjectLimit: 72
};
