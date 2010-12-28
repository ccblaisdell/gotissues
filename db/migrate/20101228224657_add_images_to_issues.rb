class AddImagesToIssues < ActiveRecord::Migration
  def self.up
    add_column :issues, :image, :string
  end

  def self.down
    remove_column :issues, :image
  end
end
