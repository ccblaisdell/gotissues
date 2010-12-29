class RemoveImagesFromCommentsAndIssues < ActiveRecord::Migration
  def self.up
    remove_column :comments, :image
    remove_column :issues, :image
  end

  def self.down
    add_column :comments, :image, :string
    add_column :issues, :image, :string
  end
end
