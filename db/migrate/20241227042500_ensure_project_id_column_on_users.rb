class EnsureProjectIdColumnOnUsers < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:users, :project_id)
      add_reference :users, :project, foreign_key: true
    end
  end
end
