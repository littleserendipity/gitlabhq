module Gitlab
  module CurrentSettings
    def current_application_settings
      key = :current_application_settings

      RequestStore.store[key] ||= begin
        if connect_to_db?
          ApplicationSetting.current || ApplicationSetting.create_from_defaults
        else
          fake_application_settings
        end
      end
    end

    def fake_application_settings
      OpenStruct.new(
        default_projects_limit: Settings.gitlab['default_projects_limit'],
        default_branch_protection: Settings.gitlab['default_branch_protection'],
        signup_enabled: Settings.gitlab['signup_enabled'],
        signin_enabled: Settings.gitlab['signin_enabled'],
        gravatar_enabled: Settings.gravatar['enabled'],
        sign_in_text: Settings.extra['sign_in_text'],
        restricted_visibility_levels: Settings.gitlab['restricted_visibility_levels'],
        max_attachment_size: Settings.gitlab['max_attachment_size'],
        session_expire_delay: Settings.gitlab['session_expire_delay'],
        import_sources: Settings.gitlab['import_sources'],
        shared_runners_enabled: Settings.gitlab_ci['shared_runners_enabled'],
        max_artifacts_size: Settings.artifacts['max_size'],
      )
    end

    private

    def connect_to_db?
      use_db = if ENV['USE_DB'] == "false"
                 false
               else
                 true
               end

      use_db && ActiveRecord::Base.connected? &&
                # The following condition is important: if a migrations adds a
                # column to the application_settings table and a validation in
                # the ApplicationSetting uses this new column we might end-up in
                # a vicious circle where migration crash before being done.
                # See https://gitlab.com/gitlab-org/gitlab-ce/issues/12606 for
                # a thorough explanation.
                !ActiveRecord::Migrator.needs_migration? &&
                ActiveRecord::Base.connection.table_exists?('application_settings')

    rescue ActiveRecord::NoDatabaseError
      false
    end
  end
end
