class AddImagesToComments < ActiveRecord::Migration
  def self.up
    add_column :comments, :image, :string
  end

  def self.down
    remove_column :comments, :image
  end
end
