class Projects::AvatarsController < Projects::ApplicationController
  include BlobHelper

  before_action :authorize_admin_project!, only: [:destroy]

  def show
    @blob = @repository.blob_at_branch('master', @project.avatar_in_git)
    if @blob
      headers['X-Content-Type-Options'] = 'nosniff'

      return if cached_blob?

      send_git_blob @repository, @blob
    else
      render_404
    end
  end

  def destroy
    @project.remove_avatar!

    @project.save
    @project.reset_events_cache

    redirect_to edit_project_path(@project)
  end
end
