class AddNotesToImages < ActiveRecord::Migration[7.1]
  def change
    add_column :images, :notes, :text
  end
end
