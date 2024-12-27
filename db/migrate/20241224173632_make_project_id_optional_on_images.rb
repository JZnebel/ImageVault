class MakeProjectIdOptionalOnImages < ActiveRecord::Migration[7.1]
  def change
    change_column_null :images, :project_id, true
  end
end
