class ApplicationController < ActionController::Base
  before_action :set_host_for_local_storage, :template_vars

  private

  def set_host_for_local_storage
    ActiveStorage::Current.host = request.base_url if Rails.application.config.active_storage.service == :local
  end


  def template_vars
    @schema = {}
    @suffix = t 'application.suffix'
    @robots = 'index,follow'
    @breadcrumbs = {}
  end


  def breadcrumbs(hash)
    @breadcrumbs.merge! hash if hash.is_a? Hash
    if defined?(@model) && current_user && current_user.admin?
      @breadcrumbs.merge! admin: url_for(id: @model.id ,
                                         action: :edit,
                                         controller: 'admin/%s' % @model.class.to_s.downcase.pluralize)
    end
  end
end
