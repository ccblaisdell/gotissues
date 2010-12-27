class AddNameToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :name, :string, :null => false
    User.update_all ["name = ?", "Name"]
  end

  def self.down
    remove_column :users, :name
  end
end
